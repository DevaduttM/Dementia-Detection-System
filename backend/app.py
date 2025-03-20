from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from cryptography.fernet import Fernet
import certifi
from predictions import predict_alzheimers
from io import BytesIO

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://sauravkreji:GYRAH53ZLpSR9YB4@cluster0.81y7c.mongodb.net/Dimentia-detection-system?retryWrites=true&w=majority"
mongo = PyMongo(app, tlsCAFile=certifi.where())

key = "sw8xEKc7JBIhiPlLLJOPbRV4wf350zVVIELwPqXr6xM="
cipher = Fernet(key.encode())

@app.route('/predict', methods=["POST", "OPTIONS"])
def predict():
    print("Received request to /predict")
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200

    
    if "image" not in request.files:
        print("No image in request")
        return jsonify({"error": "No file part"}), 400
    
    img_file = request.files["image"]
    patient_id = request.form.get("patientId")
    print(f"Received image and patientId: {patient_id}")

    if not patient_id:
        print("Missing patientId")
        return jsonify({"error": "Please provide patientId"}), 400
    
    try:
        print("Reading image bytes")
        img_bytes = BytesIO(img_file.read())
        print(f"Image bytes read: {len(img_bytes.getvalue())} bytes")
        print("Calling predict_alzheimers")
        result = predict_alzheimers(img_bytes)
        print(f"Prediction result: {result}")
        return jsonify({"patientId": patient_id, "prediction": result}), 200
    except Exception as e:
        print(f"Error in predict: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    print("Starting Flask server")
    app.run(debug=True, host="0.0.0.0", port=5000)
