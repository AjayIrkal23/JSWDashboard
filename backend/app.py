from flask import Flask, render_template, Response
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app)

rtsp = "rtsp://192.168.1.201:554/profile1"
camera = cv2.VideoCapture(rtsp)


def generate_frames():
    while True:
        # Read the camera frame
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode(".png", frame)
            frame = buffer.tobytes()

        yield (b"--frame\r\n" b"Content-Type: image/png\r\n\r\n" + frame + b"\r\n")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/video")
def video():
    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


if __name__ == "__main__":
    app.run(debug=True)
