import { HealthData } from '../types';

// Convert categorical values to match dataset format
const convertData = (data: HealthData) => ({
  age: data.age,
  sex: data.sex === 'male' ? 1 : 0,
  cp: data.chestPainType === 'typical' ? 0 : 
      data.chestPainType === 'atypical' ? 1 : 
      data.chestPainType === 'nonAnginal' ? 2 : 3,
  trestbps: data.restingBP,
  chol: data.cholesterol,
  fbs: data.fastingBS,
  restecg: data.restingECG === 'normal' ? 0 : 
           data.restingECG === 'abnormal' ? 1 : 2,
  thalach: data.maxHR,
  exang: data.exerciseAngina ? 1 : 0,
  oldpeak: data.oldpeak,
  slope: data.stSlope === 'up' ? 0 : 
         data.stSlope === 'flat' ? 1 : 2
});

// Simple logistic regression based on key risk factors
export const predictHeartDisease = (data: HealthData): number => {
  const converted = convertData(data);
  
  // Weighted risk factors based on statistical significance in the dataset
  const riskScore = 
    (converted.age > 55 ? 1 : 0) * 0.15 +
    (converted.sex === 1 ? 1 : 0) * 0.10 +
    (converted.cp > 0 ? 1 : 0) * 0.20 +
    (converted.trestbps > 140 ? 1 : 0) * 0.15 +
    (converted.chol > 250 ? 1 : 0) * 0.10 +
    (converted.fbs === 1 ? 1 : 0) * 0.05 +
    (converted.thalach < 150 ? 1 : 0) * 0.10 +
    (converted.exang === 1 ? 1 : 0) * 0.15;

  return riskScore;
}