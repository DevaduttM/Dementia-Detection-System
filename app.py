from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import check_password_hash

app = Flask(__name__)


CORS(app,origins="http://localhost:3000/login")

# MongoDB Connection
MONGO_URI = "mongodb+srv://sauravkreji:<K7pL3MLccryFnGKk>@cluster0.81y7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client.get_database('Dimentia-detection-system')
users_collection = db["Dimentia-detection-system-collection"]

@app.route('/login', methods=["POST", "OPTIONS"])  
def authenticate():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200  

    data = request.get_json()
    email = data.get('email')
    password = data.get("password")

    print("Received Request:", data) 

    if not email or not password:
        return jsonify({"error": "Please provide email and password"}), 400

    user = users_collection.find_one({"email": email})

    if user:
        stored_password = user.get("password")
        print("User Found in DB:", user)  

        if check_password_hash(stored_password, password):
            print("Login Successful!")  
            return jsonify({"message": "Authentication successful", "email": email}), 200
        else:
            print("Invalid Password!")  
            return jsonify({"error": "Invalid email or password"}), 401
    else:
        print("User Not Found!")  
        return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
