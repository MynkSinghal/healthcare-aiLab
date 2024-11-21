import React from 'react';
import { HealthData } from '../types';

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
  isLoading: boolean;
}

const HealthForm: React.FC<HealthFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<HealthData>({
    age: 45,
    sex: 'male',
    chestPainType: 'typical',
    restingBP: 120,
    cholesterol: 200,
    fastingBS: 0,
    restingECG: 'normal',
    maxHR: 150,
    exerciseAngina: false,
    oldpeak: 0,
    stSlope: 'up'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              type === 'number' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Chest Pain Type</label>
          <select
            name="chestPainType"
            value={formData.chestPainType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="typical">Typical Angina</option>
            <option value="atypical">Atypical Angina</option>
            <option value="nonAnginal">Non-Anginal Pain</option>
            <option value="asymptomatic">Asymptomatic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resting Blood Pressure</label>
          <input
            type="number"
            name="restingBP"
            value={formData.restingBP}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cholesterol</label>
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fasting Blood Sugar</label>
          <select
            name="fastingBS"
            value={formData.fastingBS}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="0">Less than 120 mg/dl</option>
            <option value="1">Greater than 120 mg/dl</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resting ECG</label>
          <select
            name="restingECG"
            value={formData.restingECG}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="abnormal">ST-T Wave Abnormality</option>
            <option value="hypertrophy">Left Ventricular Hypertrophy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Heart Rate</label>
          <input
            type="number"
            name="maxHR"
            value={formData.maxHR}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Induced Angina</label>
          <div className="mt-1">
            <input
              type="checkbox"
              name="exerciseAngina"
              checked={formData.exerciseAngina}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">Yes</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ST Depression (Oldpeak)</label>
          <input
            type="number"
            step="0.1"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ST Slope</label>
          <select
            name="stSlope"
            value={formData.stSlope}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="up">Upsloping</option>
            <option value="flat">Flat</option>
            <option value="down">Downsloping</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Calculate Risk'}
        </button>
      </div>
    </form>
  );
};

export default HealthForm;