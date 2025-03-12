// ClimateActionComponent.tsx
import React, { useState } from 'react';
import { Sparkles, Check, ChevronRight, ArrowRight } from 'lucide-react';
import { ClimateActionRecommendation, ClimateQuizResults } from './types';
import { getPersonalizedRecommendations } from './climateData';

interface ClimateActionComponentProps {
  milestoneDays: number;
}

const ClimateActionComponent: React.FC<ClimateActionComponentProps> = ({ milestoneDays }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<ClimateQuizResults>({
    transportation: 'car',
    diet: 'mixed',
    energy: 'medium',
    waste: 'medium',
    community: 'inactive'
  });
  const [recommendations, setRecommendations] = useState<ClimateActionRecommendation[]>([]);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    const personalizedRecommendations = getPersonalizedRecommendations(quizResults);
    setRecommendations(personalizedRecommendations);
    setQuizCompleted(true);
    setShowQuiz(false);
  };
  
  // Handle quiz input changes
  const handleQuizInputChange = (category: keyof ClimateQuizResults, value: string) => {
    setQuizResults(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  // Toggle action completion
  const toggleActionComplete = (actionText: string, badge: string) => {
    if (completedActions.includes(actionText)) {
      setCompletedActions(prev => prev.filter(text => text !== actionText));
      setEarnedBadges(prev => prev.filter(b => b !== badge));
    } else {
      setCompletedActions(prev => [...prev, actionText]);
      setEarnedBadges(prev => [...prev, badge]);
    }
  };
  
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">4</span>
        Climate Action
      </h3>
      
      {!quizCompleted && !showQuiz && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start mb-6">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Take action before your next {milestoneDays.toLocaleString()} days
              </h4>
              <p className="text-gray-600 mt-1">
                Answer a few questions about your lifestyle to receive personalized climate action recommendations.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowQuiz(true)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center font-medium"
          >
            Take Climate Quiz <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
      
      {showQuiz && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Climate Lifestyle Quiz</h4>
          <p className="text-gray-600 mb-6">
            Answer these questions to receive personalized recommendations that can make a difference.
          </p>
          
          <div className="space-y-6">
            {/* Transportation */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">How do you typically get around?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="transportation" 
                    value="car" 
                    checked={quizResults.transportation === 'car'}
                    onChange={() => handleQuizInputChange('transportation', 'car')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Mostly by car</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="transportation" 
                    value="public" 
                    checked={quizResults.transportation === 'public'}
                    onChange={() => handleQuizInputChange('transportation', 'public')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Mostly public transportation</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="transportation" 
                    value="active" 
                    checked={quizResults.transportation === 'active'}
                    onChange={() => handleQuizInputChange('transportation', 'active')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Mostly walking or biking</span>
                </label>
              </div>
            </div>
            
            {/* Diet */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">What best describes your diet?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="diet" 
                    value="meat" 
                    checked={quizResults.diet === 'meat'}
                    onChange={() => handleQuizInputChange('diet', 'meat')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Heavy meat consumption (daily)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="diet" 
                    value="mixed" 
                    checked={quizResults.diet === 'mixed'}
                    onChange={() => handleQuizInputChange('diet', 'mixed')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Mixed diet (some meat, some plant-based)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="diet" 
                    value="plant" 
                    checked={quizResults.diet === 'plant'}
                    onChange={() => handleQuizInputChange('diet', 'plant')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Primarily plant-based</span>
                </label>
              </div>
            </div>
            
            {/* Energy Usage */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">How would you describe your home energy usage?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="energy" 
                    value="high" 
                    checked={quizResults.energy === 'high'}
                    onChange={() => handleQuizInputChange('energy', 'high')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>High (large home, many devices, old appliances)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="energy" 
                    value="medium" 
                    checked={quizResults.energy === 'medium'}
                    onChange={() => handleQuizInputChange('energy', 'medium')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Medium (average home, mix of efficient and older appliances)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="energy" 
                    value="low" 
                    checked={quizResults.energy === 'low'}
                    onChange={() => handleQuizInputChange('energy', 'low')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Low (energy efficient home, renewable energy)</span>
                </label>
              </div>
            </div>
            
            {/* Waste */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">How do you manage waste?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="waste" 
                    value="high" 
                    checked={quizResults.waste === 'high'}
                    onChange={() => handleQuizInputChange('waste', 'high')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Minimal recycling, regular trash disposal</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="waste" 
                    value="medium" 
                    checked={quizResults.waste === 'medium'}
                    onChange={() => handleQuizInputChange('waste', 'medium')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Regular recycling, some waste reduction effort</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="waste" 
                    value="low" 
                    checked={quizResults.waste === 'low'}
                    onChange={() => handleQuizInputChange('waste', 'low')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Comprehensive recycling, composting, minimal waste</span>
                </label>
              </div>
            </div>
            
            {/* Community Involvement */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Are you involved in climate initiatives?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="community" 
                    value="active" 
                    checked={quizResults.community === 'active'}
                    onChange={() => handleQuizInputChange('community', 'active')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>Yes, I participate in community climate actions</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="community" 
                    value="inactive" 
                    checked={quizResults.community === 'inactive'}
                    onChange={() => handleQuizInputChange('community', 'inactive')}
                    className="h-4 w-4 text-green-600 mr-2" 
                  />
                  <span>No, I'm not currently involved</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button 
              onClick={() => setShowQuiz(false)}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleQuizSubmit}
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition font-medium"
            >
              Get Recommendations
            </button>
          </div>
        </div>
      )}
      
      {quizCompleted && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Your Personalized Climate Actions</h4>
            <p className="text-gray-600 mb-6">
              Complete these actions before your next milestone to earn eco-badges and make a positive impact on the environment.
            </p>
            
            {earnedBadges.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h5 className="font-medium text-green-700 mb-3">Earned Badges</h5>
                <div className="flex flex-wrap gap-2">
                  {earnedBadges.map((badge, idx) => (
                    <div key={idx} className="bg-white rounded-full px-3 py-1 text-sm font-medium text-green-600 border border-green-200 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                    <h5 className="font-medium text-gray-900">{recommendation.title}</h5>
                    <p className="text-sm text-gray-600">{recommendation.description}</p>
                  </div>
                  
                  <div className="p-4">
                    <ul className="space-y-3">
                      {recommendation.actions.map((action, idx) => (
                        <li key={idx} className="flex items-center">
                          <button 
                            onClick={() => toggleActionComplete(action.text, action.badge)}
                            className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 border ${
                              completedActions.includes(action.text) 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-gray-300'
                            }`}
                          >
                            {completedActions.includes(action.text) && <Check className="h-3 w-3" />}
                          </button>
                          <div className="flex-1">
                            <span className="text-gray-700">{action.text}</span>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                action.impact === 'High' 
                                  ? 'bg-green-100 text-green-800' 
                                  : action.impact === 'Medium'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {action.impact} Impact
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                +1 {action.badge} Badge
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => {
                  setShowQuiz(true);
                  setQuizCompleted(false);
                }}
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                Retake Quiz <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimateActionComponent;