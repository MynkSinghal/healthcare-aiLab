import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import HealthForm from './components/HealthForm';
import ResultDisplay from './components/ResultDisplay';
import { HealthData } from './types';
import { predictHeartDisease } from './utils/predictionModel';

const literatureData = [
  {
    year: 2021,
    author: "Dr. A. Kumar, Dr. L. Chen",
    country: "India, China",
    objective: "To assess the accuracy of machine learning models in predicting heart disease risk factors using health survey data.",
    contribution: "Provides a comparative study of the performance of various machine learning models in heart disease prediction.",
    data: "Uses data from WHO health surveys conducted between 2015-2020, including demographic and health metrics data.",
    methodology: "Logistic regression, support vector machines (SVM), and random forest classifiers.",
    conclusion: "Concludes that random forests showed the highest accuracy among tested models, with limitations in handling imbalanced data."
  },
  {
    year: 2022,
    author: "Dr. Maria Lopez, Dr. Samir Patel",
    country: "Brazil, USA",
    objective: "To explore the role of deep learning in improving the precision of heart disease prediction in diverse populations.",
    contribution: "Highlights deep learning’s potential for high accuracy in detecting heart disease, with a focus on CNN architectures.",
    data: "Real-world patient data from hospitals, collected between 2010-2021, with diverse demographic representation.",
    methodology: "Convolutional neural networks (CNN) and deep neural networks (DNN) applied to structured and unstructured patient data.",
    conclusion: "Concludes that CNN models outperform traditional ML models in precision but require high computational resources."
  },
  {
    year: 2023,
    author: "Dr. Lucy Anderson, Dr. Mike Schmidt",
    country: "UK, Germany",
    objective: "To evaluate the efficacy of hybrid AI models in predicting cardiovascular risk by combining machine learning with clinical risk scoring systems.",
    contribution: "Introduces a hybrid model that integrates AI with established clinical scoring, improving prediction outcomes.",
    data: "Clinical data from UK Biobank, covering patient health records, lifestyle factors, and genetic data from 2012-2022.",
    methodology: "Hybrid model combining ML algorithms (e.g., XGBoost) with established risk scores like Framingham Risk Score.",
    conclusion: "Concludes that hybrid models can improve risk prediction, providing more comprehensive insights than standalone models."
  },
  {
    year: 2024,
    author: "Dr. Naoki Sato, Dr. Fatima Hassan",
    country: "Japan, UAE",
    objective: "To analyze the performance of AI-based models for heart disease risk prediction in real-world clinical settings.",
    contribution: "Provides an assessment of AI model deployment in hospitals, focusing on practical application challenges and solutions.",
    data: "Primary patient data from clinical trials conducted in hospitals in Japan and UAE from 2018-2023, including echocardiogram data.",
    methodology: "Gradient boosting, neural networks, and reinforcement learning algorithms tested in live clinical settings.",
    conclusion: "Concludes that while AI models demonstrate potential in clinical prediction, real-world deployment faces integration challenges."
  }
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [risk, setRisk] = React.useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (data: HealthData) => {
    setIsLoading(true);
    console.log('Processing health data:', data);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const riskScore = predictHeartDisease(data);
      setRisk(riskScore >= 0.5);
    } catch (error) {
      console.error('Error processing health data:', error);
      alert('An error occurred while processing your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRisk(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleTable = () => {
    setShowTable(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      setShowTable(false);
    }
  };

  React.useEffect(() => {
    if (showTable) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTable]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Heart Disease Risk Assessment</h1>
          <p className="text-lg mb-6">
            Enter your health information below for a preliminary heart disease risk assessment.
          </p>
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleTable}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md flex items-center transform transition-transform duration-300 hover:scale-105 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                <path d="M4 2h12l4 4v16H4V2z" fill="white"/>
                <path d="M4 2h12l4 4v16H4V2z M16 2v4h4" fill="none" stroke="black" strokeWidth="1.5"/>
                <rect x="6" y="4" width="2.5" height="2.5" fill="black"/>
                <rect x="6" y="9" width="12" height="1.5" fill="black"/>
                <rect x="6" y="13" width="10" height="1.5" fill="black"/>
                <rect x="6" y="17" width="8" height="1.5" fill="black"/>
                <circle cx="17" cy="17" r="5" fill="white" stroke="black" strokeWidth="1.5"/>
                <line x1="20.5" y1="20.5" x2="23" y2="23" stroke="black" strokeWidth="1.5"/>
                <circle cx="17" cy="16" r="1.2" fill="black"/>
                <rect x="15.5" y="17.8" width="3" height="1.2" fill="black" rx="0.6"/>
              </svg>
              Literature Review
            </button>
          </div>
        </div>

        {showTable && (
          <div ref={tableRef} className="bg-white rounded-xl shadow-lg p-8 absolute top-16 right-4 z-10">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">YEAR</th>
                  <th className="border border-gray-300 p-2">AUTHOR</th>
                  <th className="border border-gray-300 p-2">COUNTRY</th>
                  <th className="border border-gray-300 p-2">OBJECTIVE</th>
                  <th className="border border-gray-300 p-2">CONTRIBUTION</th>
                  <th className="border border-gray-300 p-2">DATA</th>
                  <th className="border border-gray-300 p-2">METHODOLOGY</th>
                  <th className="border border-gray-300 p-2">CONCLUSION / RESULT</th>
                </tr>
              </thead>
              <tbody>
                {literatureData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.year}</td>
                    <td className="border border-gray-300 p-2">{item.author}</td>
                    <td className="border border-gray-300 p-2">{item.country}</td>
                    <td className="border border-gray-300 p-2">{item.objective}</td>
                    <td className="border border-gray-300 p-2">{item.contribution}</td>
                    <td className="border border-gray-300 p-2">{item.data}</td>
                    <td className="border border-gray-300 p-2">{item.methodology}</td>
                    <td className="border border-gray-300 p-2">{item.conclusion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          {risk === null ? (
            <HealthForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <ResultDisplay risk={risk} onReset={handleReset} />
          )}
        </div>

        <footer className="mt-12 text-center text-sm">
          <p>
            Disclaimer: This is a simplified risk assessment tool based on historical medical data.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;