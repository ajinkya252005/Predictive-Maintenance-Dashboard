from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
import joblib

app = Flask(__name__)

# 1. Load the Brains (Model + Math)
print("Loading model and scalers...")
model = tf.keras.models.load_model('maintenance_model.keras')
scaler = joblib.load('scaler.pkl')
encoder = joblib.load('encoder.pkl')
print("Model loaded successfully!")

# 2. The Home Page
@app.route('/')
def home():
    return render_template('index.html')

# 3. The API (Where the HTML sends data)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the JavaScript request
        data = request.get_json()
        
        # Extract the raw values
        type_val = data['type'] # "L", "M", or "H"
        air_temp = float(data['air_temp'])
        process_temp = float(data['process_temp'])
        rot_speed = float(data['rot_speed'])
        torque = float(data['torque'])
        tool_wear = float(data['tool_wear'])

        # Preprocessing Step A: Convert "L/M/H" to number (0/1/2)
        # We wrap it in [ ] because transform expects a list
        type_encoded = encoder.transform([type_val])[0]

        # Preprocessing Step B: Scale the data
        # Create an array of all 6 inputs
        input_array = np.array([[type_encoded, air_temp, process_temp, rot_speed, torque, tool_wear]])
        input_scaled = scaler.transform(input_array)

        # Preprocessing Step C: Predict
        prediction_prob = model.predict(input_scaled)[0][0]
        
        # Convert probability to simple JSON response
        # We explicitly convert float32 to standard float for JSON compatibility
        return jsonify({
            'probability': float(prediction_prob),
            'status': 'Danger' if prediction_prob > 0.5 else 'Safe'
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)