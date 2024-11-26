import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the dataset
try:
    data = pd.read_csv('heart.csv')
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: 'heart.csv' file not found.")
    exit()

# Check the first few rows of the dataset
print("First few rows of the dataset:")
print(data.head())

# Prepare the features and target variable
X = data.drop('target', axis=1)  # Assuming 'target' is the column for heart disease
y = data['target']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Data split into training and testing sets.")

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training completed.")

# Save the trained model
joblib.dump(model, 'heart_disease_model.pkl')
print("Model trained and saved as 'heart_disease_model.pkl'")
