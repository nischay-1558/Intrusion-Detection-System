import React from 'react';
import { Play, PauseCircle } from 'lucide-react';

type ModelCardProps = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  accuracy: number;
  lastTrainedAt: Date | null;
  onActivate: () => void;
  onTrain: () => void;
  trainingProgress?: number;
};

const ModelCard: React.FC<ModelCardProps> = ({
  id,
  name,
  type,
  status,
  accuracy,
  lastTrainedAt,
  onActivate,
  onTrain,
  trainingProgress = 0
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-400 capitalize">{type} Model</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'active' ? 'bg-green-900 text-green-300' :
            status === 'training' ? 'bg-blue-900 text-blue-300' :
            'bg-gray-700 text-gray-300'
          }`}>
            {status === 'training' ? 'Training...' : status}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Accuracy</span>
            <span className="font-medium">{accuracy.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>
        
        {status === 'training' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Training Progress</span>
              <span className="font-medium">{trainingProgress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${trainingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-400 mb-4">
          {lastTrainedAt 
            ? `Last trained: ${lastTrainedAt.toLocaleDateString()}`
            : 'Not trained yet'
          }
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={onActivate}
            disabled={status === 'training'}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg ${
              status === 'active' 
                ? 'bg-gray-700 text-gray-300' 
                : status === 'training'
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors'
            }`}
          >
            {status === 'active' ? (
              <>
                <PauseCircle className="h-4 w-4 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Activate
              </>
            )}
          </button>
          
          <button
            onClick={onTrain}
            disabled={status === 'training'}
            className={`flex-1 py-2 px-4 rounded-lg ${
              status === 'training'
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 transition-colors'
            }`}
          >
            Train Model
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;