import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ResultDisplayProps {
  risk: boolean;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ risk, onReset }) => {
  const lowerRiskRecommendations = [
    'Maintain a balanced, heart-healthy diet',
    'Exercise regularly (at least 150 minutes per week)',
    'Monitor blood pressure and cholesterol levels',
    'Avoid smoking and limit alcohol consumption',
    'Manage stress through relaxation techniques',
  ];

  const higherRiskRecommendations = [
    'Consult with a healthcare professional for a thorough evaluation',
    'Consider a personalized exercise program',
    'Regularly monitor your heart health with your doctor',
    'Adopt a heart-healthy diet rich in fruits, vegetables, and whole grains',
    'Participate in stress management programs',
  ];

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        {risk ? (
          <AlertTriangle className="w-16 h-16 text-red-500" />
        ) : (
          <CheckCircle className="w-16 h-16 text-green-500" />
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {risk ? 'Higher Risk Detected' : 'Lower Risk Detected'}
      </h2>

      <p className="text-gray-600 mb-8">
        {risk
          ? 'Based on the provided information, you may have an elevated risk of heart disease. Please consult with a healthcare professional for a thorough evaluation.'
          : 'Based on the provided information, you appear to have a lower risk of heart disease. However, maintaining a healthy lifestyle is still important.'}
      </p>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">General Recommendations:</h3>
        <ul className="text-left text-gray-600 space-y-2">
          {(risk ? higherRiskRecommendations : lowerRiskRecommendations).map((recommendation, index) => (
            <li key={index}>• {recommendation}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onReset}
        className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Start New Assessment
      </button>
    </div>
  );
};

export default ResultDisplay;