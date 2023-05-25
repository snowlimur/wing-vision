Для удобства работы с репозиторием можно установить http://taskfile.dev/. 
Для запуска проекта необходим docker & python 3.

Запуск трансляции в фоновом режиме
```bash
task up
```
Адрес RTMP сервера или путь до видео можно изменить в файле `.env`. При первом запуске файл `.env` скопируется из файла `.env.example`.

По умолчанию, просматривать трансляцию можно в VLC плеере по адресу `rtmp://localhost/live`

Остановка трансляции
```bash
task down
```

Чтобы запустить трансляцию без докера, вам понадобится FFmpeg (https://ffmpeg.org/download.html) и живой RTMP сервер.

Запуск трансляции без докера можно запустить командой, где `examples/long.mp4` путь до файла с видео:
```bash
task ffmpeg -- examples/long.mp4
```

Виды птиц на видео:
- The Great Tit
- Tufted titmouse
- Sparrows
- Northern cardinal

### Train model
```bash
yolo task=detect mode=train model=yolov8s.pt data=../datasets/birds/data.yaml epochs=200 imgsz=640
```

### Detect
```bash
yolo task=detect mode=predict model="runs/detect/train/weights/best.pt" source="examples/long.mp4" show=True
```
 
```bash
yolo task=detect mode=predict model=yolov8n.pt source="examples/long.mp4" show=True
```
