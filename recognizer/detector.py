from ultralytics import YOLO


class YoloBirdDetector:
    def __init__(self):
        self.model = YOLO('yolov8n.pt', task='detect')
        self.birdClass = 14  # 14 is the class of bird

    def determine(self, frame, show):
        results = self.model.predict(source=frame, verbose=False, classes=[self.birdClass], show=show)

        if len(results) == 0:
            return False

        if len(results[0].boxes):
            return True

        return False
