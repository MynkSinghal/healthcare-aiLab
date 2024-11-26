import joblib
import pandas as pd

# Load the trained model
model = joblib.load('heart_disease_model.pkl')

# Function to predict heart disease
def predict_heart_disease(input_data):
    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])
    
    # Log the input data for debugging
    print("Input data for prediction:", input_df)

    # Make prediction
    prediction = model.predict(input_df)
    
    # Log the prediction result
    print("Prediction result:", prediction[0])
    
    return prediction[0]

# Example usage
if __name__ == "__main__":
    # Example input data (replace with actual data)
    input_data = {
        'age': 63,
        'sex': 1,
        'cp': 3,
        'trestbps': 145,
        'chol': 233,
        'fbs': 1,
        'restecg': 0,
        'thalach': 150,
        'exang': 0,
        'oldpeak': 2.3,
        'slope': 1,
        'ca': 0,
        'thal': 1
    }
    
    result = predict_heart_disease(input_data)
    print("Predicted heart disease:", "Yes" if result == 1 else "No")
