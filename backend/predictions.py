# backend/model_predict.py
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load the model once when the module is imported
model = tf.keras.models.load_model("alzheimers_classification_model.h5",compile=False)
class_labels = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]

def predict_alzheimers(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    confidence = np.max(predictions) * 100
    return {"class": class_labels[predicted_class], "confidence": confidence}