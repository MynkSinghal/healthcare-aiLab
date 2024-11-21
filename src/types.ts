export interface HealthData {
  age: number;
  sex: 'male' | 'female';
  chestPainType: 'typical' | 'atypical' | 'nonAnginal' | 'asymptomatic';
  restingBP: number;
  cholesterol: number;
  fastingBS: number;
  restingECG: 'normal' | 'abnormal' | 'hypertrophy';
  maxHR: number;
  exerciseAngina: boolean;
  oldpeak: number;
  stSlope: 'up' | 'flat' | 'down';
}