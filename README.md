# Predictive Maintenance Dashboard

An End-to-End Machine Learning application that predicts milling machine failures in real-time.

![Project Status](https://img.shields.io/badge/Status-Complete-green)
![Tech Stack](https://img.shields.io/badge/Stack-TensorFlow%20|%20Flask%20|%20JS-blue)

## Overview
This project leverages deep learning (TensorFlow) to analyze sensor data from industrial milling machines. It predicts potential failures (Tool Wear, Overstrain, Power Failure) before they happen, allowing for predictive maintenance.

## Features
* **Deep Learning Model:** Trained on the AI4I 2020 dataset using a Multi-Layer Perceptron (MLP).
* **Real-time Interface:** Flask-based backend serving a responsive web dashboard.
* **Industrial UI:** Dark-mode design tailored for control room environments.
* **Robust Preprocessing:** Handles data scaling and categorical encoding automatically.

## Tech Stack
* **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript
* **Backend:** Python 3.11, Flask
* **AI/ML:** TensorFlow (Keras), Scikit-Learn, Pandas

## How to Run
1. Clone the repo
```bash
git clone [https://github.com/ajinkya252005/Predictive-Maintenance-Dashboard.git](https://github.com/ajinkya252005/Predictive-Maintenance-Dashboard.git)
```
2. Install dependencies
```bash
pip install -r requirements.txt
```
3. Run the application
```bash
python app.py
```
