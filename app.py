from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Load the model
try:
    with open('mental_disorder_model.pkl', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    raise Exception("Model file 'mental_disorder_model.pkl' not found!")

DISORDERS = ['Anxiety', 'Depression', 'Loneliness', 'Stress', 'Normal']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        answers = data.get('answers')
        
        if not answers or len(answers) != 24:
            return jsonify({'error': 'Invalid input'}), 400
            
        # Convert input to numpy array
        X = np.array(answers).reshape(1, -1)
        
        # Get prediction and probability
        prediction = model.predict(X)[0]
        probabilities = model.predict_proba(X)[0]
        confidence = float(probabilities[prediction])
        
        return jsonify({
            'disorder': DISORDERS[prediction],
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)