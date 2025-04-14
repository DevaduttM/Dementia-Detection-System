from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from cryptography.fernet import Fernet
import certifi
from predictions import predict_alzheimers
from io import BytesIO
import requests
import time

app = Flask(__name__)
CORS(app)

CLOUDINARY_CLOUD_NAME = "dwk5667vc"
CLOUDINARY_API_KEY = "241414119465783"
CLOUDINARY_API_SECRET = "Vk5gjwexmtBc5TJ5hWqRZMe8rxc"

app.config["MONGO_URI"] = "mongodb+srv://sauravkreji:GYRAH53ZLpSR9YB4@cluster0.81y7c.mongodb.net/Dimentia-detection-system?retryWrites=true&w=majority"
mongo = PyMongo(app, tlsCAFile=certifi.where())

key = "sw8xEKc7JBIhiPlLLJOPbRV4wf350zVVIELwPqXr6xM="
cipher = Fernet(key.encode())

def get_next_sequence():
    result = mongo.db.counters.find_one_and_update(
        {"_id": "patient_id"},
        {"$inc": {"sequence": 1}},
        upsert=True,
        return_document=True
    )
    return result["sequence"]

@app.route('/signup', methods=["POST", "OPTIONS"])
def signup():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    sex = data.get('sex')
    age = data.get('age')
    if not name or not email or not password or not sex or not age:
        return jsonify({"error": "Please provide name, email, password, sex, and age"}), 400
   
    if mongo.db["Patient-data"].find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409
    try:
        encrypted_password = cipher.encrypt(password.encode()).decode()
        patient_id = str(get_next_sequence())
        mongo.db["Patient-data"].insert_one({
            "patient_name": name,
            "email": email,
            "password": encrypted_password,
            "patient_id": patient_id,
            "sex": sex,
            "age": age,
            "images": []
        })
        return jsonify({"message": "Signup successful", "email": email}), 201
    except Exception as e:
        return jsonify({"error": "Failed to create account", "details": str(e)}), 500

@app.route('/login', methods=["POST", "OPTIONS"])
def authenticate():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    data = request.get_json()
    email = data.get('email')
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Please provide email and password"}), 400
    user = mongo.db["Patient-data"].find_one({"email": email})
    if user:
        encrypted_password = user.get("password")
        try:
            decrypted_password = cipher.decrypt(encrypted_password.encode()).decode()
            if decrypted_password == password:
                return jsonify({
                    "message": "Authentication successful",
                    "email": email,
                    "patient_id": user["patient_id"]
                }), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        except Exception as e:
            return jsonify({"error": "Invalid encrypted password"}), 500
    else:
        return jsonify({"error": "Invalid email or password"}), 404

@app.route('/patient', methods=["GET", "OPTIONS"])
def get_patient():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    try:
        patient_id = request.args.get('patient_id')
        if not patient_id:
            return jsonify({"error": "Patient ID is required"}), 400
        patient = mongo.db["Patient-data"].find_one(
            {"patient_id": patient_id}, 
            {"_id": 0, "patient_name": 1, "age": 1, "sex": 1, "images": 1}
        )
        if patient:
            latest_scanid = patient.get("images", [{}])[-1].get("scanid", "00000") if patient.get("images") else "00000"
            return jsonify({
                "patientId": patient_id,
                "patientName": patient["patient_name"],
                "age": patient.get("age"),
                "sex": patient.get("sex"),
                "images": patient.get("images", []),
                "latestScanId": latest_scanid
            }), 200
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
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
        img_data = img_file.read()
        upload_url = f"https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/image/upload"
        files = {'file': (img_file.filename, img_data, img_file.content_type)}
        data = {
            'api_key': CLOUDINARY_API_KEY,
            'timestamp': int(time.time()),
            'upload_preset': 'dementia_upload'
        }
        response = requests.post(
            upload_url,
            files=files,
            data=data,
            auth=(CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET),
            timeout=30
        )
        if response.status_code != 200:
            error_detail = response.text
            return jsonify({
                "error": "Failed to upload image to Cloudinary",
                "details": error_detail
            }), 500
        cloudinary_response = response.json()
        image_url = cloudinary_response['secure_url']
        patient = mongo.db["Patient-data"].find_one({"patient_id": patient_id})
        current_scanid = patient.get("images", [{}])[-1].get("scanid", "00000") if patient.get("images") else "00000"
        new_scanid = str(int(current_scanid) + 1).zfill(5)
        mongo.db["Patient-data"].update_one(
            {"patient_id": patient_id},
            {"$push": {"images": {"url": image_url, "scanid": new_scanid}}},
            upsert=True
        )
        img_bytes = BytesIO(img_data)
        result = predict_alzheimers(img_bytes)
        return jsonify({
            "patientId": patient_id,
            "prediction": result,
            "newScanId": new_scanid,
            "imageUrl": image_url
        }), 200
    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "Failed to connect to Cloudinary",
            "details": str(e)
        }), 500
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)