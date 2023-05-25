import cv2
import detector
import writer
import redis
import time
import psycopg2

host = 'rtmp://localhost:1935'

def process(stream, cap, detector, redis_client, pg_client):
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    if fps == 0 or width == 0 or height == 0:
        return

    meta = writer.MetaFrame(fps, width, height)

    print('process', stream)
    cursor = pg_client.cursor()
    stream_key = stream[5:]
    cursor.execute(f"SELECT id, \"ownerId\" FROM stream WHERE key = '{stream_key}'")
    stream_id, owner_id = cursor.fetchone()
    print('stream_id', stream_id, 'owner_id', owner_id)
    cursor.close()

    w = writer.Writer(pg_client, stream_id, owner_id, 'videos', meta)
    w.maxDuration(15)
    frame_number = 0
    with_bird = True

    while True:
        ret, frame = cap.read()
        if not ret:
            print('frame is broken')
            break

        frame_number += 1
        if frame_number % fps == 0:
            expire(redis_client, stream)
            with_bird = detector.determine(frame, False)
        w.append(frame, with_bird)

    w.close()


def build_working_key(stream):
    return f'working:{stream}'


def try_lock(redis_client, stream):
    working_key = build_working_key(stream)
    v = redis_client.incr(working_key, 1)
    if v == 1:
        return True
    else:
        redis_client.decr(working_key, 1)

    return False


def expire(redis_client, stream):
    working_key = build_working_key(stream)
    return redis_client.expire(working_key, 5)


def unlock(redis_client, stream):
    working_key = build_working_key(stream)
    return redis_client.delete(working_key)


def get_stream(redis_client):
    for key in redis_client.scan_iter("online:*"):
        stream = redis_client.get(key).decode('utf-8')
        if try_lock(redis_client, stream):
            return stream

    return ''


if __name__ == '__main__':
    pg = psycopg2.connect(database="wingvision", host="localhost", user="postgres", password="example", port="5432")

    r = redis.Redis(host='localhost', port=6379, db=0)
    while True:
        stream = get_stream(r)
        if stream == '':
            time.sleep(1)
        else:
            expire(r, stream)
            birdDetector = detector.YoloBirdDetector()
            url = f'{host}/{stream}'
            cap = cv2.VideoCapture(url)
            if cap.isOpened():
                process(stream, cap, birdDetector, r, pg)
            unlock(r, stream)
            cap.release()
