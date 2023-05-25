import cv2
from datetime import datetime


class MetaFrame:
    def __init__(self, fps, width, height):
        self.fps = fps
        self.width = width
        self.height = height


class Writer:
    def __init__(self, pg_client, stream_id, owner_id, path, meta):
        self.pg = pg_client
        self.stream_id = stream_id
        self.owner_id = owner_id
        self.prefix = f'{owner_id}__{stream_id}'
        self.path = path
        self.meta = meta
        self.minimumFrames = meta.fps * 10
        self.maxEmptyFrames = meta.fps * 5
        self.maxFrames = meta.fps * 60
        self.countEmptyFrames = 0
        self.countFrames = 0
        self.isWriting = False
        self.frames = []
        self.file_name = ''
        self.file = None

    def maxEmptyDuration(self, seconds):
        self.maxEmptyFrames = self.meta.fps * seconds

    def maxDuration(self, seconds):
        self.maxFrames = self.meta.fps * seconds

    def append(self, frame, withBird):
        if withBird:
            self.countEmptyFrames = 0
            if not self.isWriting:
                self.isWriting = True

        else:
            if self.isWriting:
                self.countEmptyFrames += 1
                if self.countEmptyFrames > self.maxEmptyFrames:
                    self.close()

        if self.isWriting:
            if self.file is not None:
                self._write(frame)
                return

            self.frames.append(frame)
            if len(self.frames) >= self.minimumFrames:
                self.file = self._open()
                for frame in self.frames:
                    self.file.write(frame)
                    self.countFrames += 1
                self.frames = []

    def _open(self):
        now = datetime.timestamp(datetime.now())
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.file_name = f'{self.prefix}__{now}.mp4'
        return cv2.VideoWriter(f'{self.path}/{self.file_name}', fourcc, self.meta.fps,
                               (self.meta.width, self.meta.height))

    def close(self):
        if self.file is not None:
            cursor = self.pg.cursor()
            cursor.execute(
                'INSERT INTO video ("streamId", "ownerId", "file", "duration", "time", "updated_at") VALUES (%s, %s, '
                '%s, %s, NOW(), NOW())',
                (self.stream_id, self.owner_id, self.file_name, int(self.countFrames / self.meta.fps)))
            self.pg.commit()
            cursor.close()
            self.file.release()
            self.file = None
            self.file_name = ''

        self.isWriting = False
        self.countFrames = 0
        self.frames = []

    def _write(self, frame):
        self.file.write(frame)
        self.countFrames += 1

        if self.countFrames > self.maxFrames:
            self.close()
