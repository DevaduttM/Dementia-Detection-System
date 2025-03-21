from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import certifi
from predictions import predict_alzheimers  # Assuming this exists
from io import BytesIO
import uuid

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://sauravkreji:GYRAH53ZLpSR9YB4@cluster0.81y7c.mongodb.net/Dimentia-detection-system?retryWrites=true&w=majority"
mongo = PyMongo(app, tlsCAFile=certifi.where())

@app.route('/patient', methods=["GET", "OPTIONS"])
@app.route('/patient', methods=["GET", "OPTIONS"])
def get_patient():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    try:
        patient_id = request.args.get('patient_id')
        if not patient_id:
            return jsonify({"error": "Patient ID is required"}), 400
        
        patient = mongo.db["Dimentia-detection-system-Patient"].find_one(
            {"patient_id": patient_id}, 
            {"_id": 0, "patient_name": 1}
        )
        if patient:
            return jsonify({
                "patientId": patient_id,
                "patientName": patient["patient_name"]
            }), 200
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        print(f"Error fetching patient: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/predict', methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    img_file = request.files["image"]
    patient_id = request.form.get("patientId")
    if not patient_id:
        return jsonify({"error": "Please provide patientId"}), 400
    
    try:
        scan_id = str(uuid.uuid4())[:8]
        img_bytes = BytesIO(img_file.read())
        result = predict_alzheimers(img_bytes) 
        return jsonify({
            "patientId": patient_id,
            
            "prediction": result
        }), 200
    except Exception as e:
        print(f"Error in predict: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    print("Starting Flask server")
    app.run(debug=True, host="0.0.0.0", port=5000)