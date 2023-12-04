from flask import Flask, Response, render_template
from flask_cors import CORS
import cv2
import time

app = Flask(__name__)
CORS(app)










def generate_frames():
    
    rtsp = "rtsp://admin:admin@10.10.33.213/media/video1"
    camera = cv2.VideoCapture(rtsp)
    camera.set(cv2.CAP_PROP_BUFFERSIZE,1)
 

    while True:
        try:

            start_time = time.time()
        
            # Read the camera frame
            success, frame = camera.read()
            if not success:
                camera.release()
                cv2.VideoCapture(rtsp)
                continue
            elapsed_time = time.time() - start_time
       
            ret, buffer = cv2.imencode(".jpg", frame)
          
          
            frame = buffer.tobytes()
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")
        except Exception as e:
            camera.release()
            camera =  cv2.VideoCapture(rtsp)
            time.sleep(2)
        
        





@app.route("/video")
def video():
    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


if __name__ == "__main__":
    app.run(debug=True)
