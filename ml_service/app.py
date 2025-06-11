from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pickle
import re
import string
from nltk.corpus import stopwords
from flask_cors import CORS
import os
import nltk

MAXLEN = 10

nltk.download('stopwords')
stop_words = set(stopwords.words('indonesian'))

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

model = tf.keras.models.load_model("model_lstm_kategori.h5")

def clean_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.strip()
    tokens = text.split()
    tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(tokens)

app = Flask(__name__)
CORS(app)

@app.route("/api/classify", methods=["POST"])
def predict_category():
    data = request.get_json()
    description = data.get("description", "")

    cleaned = clean_text(description)
    print("Cleaned text:", cleaned)

    sequence = tokenizer.texts_to_sequences([cleaned])
    print("Token sequence:", sequence)

    padded = tf.keras.preprocessing.sequence.pad_sequences(sequence, maxlen=MAXLEN, padding='post')
    print("Padded sequence:", padded)

    prediction = model.predict(padded)
    predicted_index = np.argmax(prediction)
    label = label_encoder.inverse_transform([predicted_index])[0]

    return jsonify({"category": label})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)