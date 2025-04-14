import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
from PIL import Image

print("predictions.py loaded")

model = None
class_labels = ["Mild Demented", "Moderate Demented", "Non Demented", "Very Mild Demented"]

def load_model_once():
    global model
    if model is None:
        print("Loading model...")
        model = tf.keras.models.load_model("alzheimers_classification_model.h5", compile=False)
        print("Model loaded successfully")
    return model

def predict_alzheimers(img_bytes):
    print("Starting predict_alzheimers")
    try:
        model = load_model_once()
        img = Image.open(img_bytes)
        img = img.resize((150, 150))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0 

        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions)
        confidence = float(np.max(predictions) * 100)

        print(f"Prediction: {class_labels[predicted_class]}, Confidence: {confidence}")
        return {"class": class_labels[predicted_class], "confidence": confidence}
    except Exception as e:
        print(f"Error in predict_alzheimers: {e}")
        raise
