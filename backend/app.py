from flask import Flask, Response
from flask_cors import CORS
import cv2
import time

app = Flask(__name__)
CORS(app)

class Camera:
    def __init__(self, rtsp_url):
        self.rtsp_url = rtsp_url
        self.camera = None
        self.connect()

    def connect(self):
        self.camera = cv2.VideoCapture(self.rtsp_url)
        self.camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    def read_frame(self):
        success, frame = self.camera.read()
        if not success:
            self.reconnect()
            success, frame = self.camera.read()
        return success, frame

    def reconnect(self):
        self.camera.release()
        time.sleep(2)  # Wait before reconnecting
        self.connect()

    def release(self):
        if self.camera:
            self.camera.release()

def generate_frames(rtsp_url):
    camera = Camera(rtsp_url)

    while True:
        try:
            start_time = time.time()
            success, frame = camera.read_frame()
            
            if not success:
                continue

            elapsed_time = time.time() - start_time
            ret, buffer = cv2.imencode(".jpg", frame)
            frame = buffer.tobytes()
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")
        except Exception as e:
            print(f"Exception: {e}")
            camera.reconnect()

@app.route("/video")
def video():
    rtsp_url = "rtsp://admin:admin@10.10.33.213/media/video1"
    return Response(
        generate_frames(rtsp_url), mimetype="multipart/x-mixed-replace; boundary=frame"
    )

if __name__ == "__main__":
    app.run(debug=True)
