from flask import Flask, Response
from flask_cors import CORS
import cv2
import time

app = Flask(__name__)
CORS(app)

def generate_frames():
    rtsp = "rtsp://admin:admin@10.10.33.213/media/video1"
    while True:
        try:
            camera = cv2.VideoCapture(rtsp)
            camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            
            if not camera.isOpened():
                raise Exception("Failed to open camera stream")

            while camera.isOpened():
                success, frame = camera.read()
                if not success:
                    raise Exception("Failed to read frame from camera")

                ret, buffer = cv2.imencode('.jpg', frame)
                if not ret:
                    raise Exception("Failed to encode frame")

                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except Exception as e:
            print(f"Error: {e}. Reconnecting...")
            time.sleep(2)  # Wait before trying to reconnect
            continue
        finally:
            camera.release()

@app.route("/video")
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)
