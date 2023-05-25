import cv2
import detector


def monitor(cap, detector):
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    if fps == 0 or width == 0 or height == 0:
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print('frame is broken')
            break

        detector.determine(frame, True)


if __name__ == '__main__':
    detector = detector.YoloBirdDetector()
    cap = cv2.VideoCapture('rtmp://localhost:1935/live/e052126a-63b9-4b51-8fa3-a24d653fd31b')

    if cap.isOpened():
        monitor(cap, detector)

    cap.release()
    cv2.destroyAllWindows()
