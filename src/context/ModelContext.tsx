import React, { createContext, useState, useContext } from 'react';

type Model = {
  id: string;
  name: string;
  type: 'autoencoder' | 'cnn';
  status: 'active' | 'inactive' | 'training';
  accuracy: number;
  lastTrainedAt: Date | null;
};

type ModelContextType = {
  models: Model[];
  activeModel: Model | null;
  trainingProgress: number;
  setActiveModel: (model: Model) => void;
  trainModel: (modelId: string) => void;
};

const initialModels: Model[] = [
  {
    id: '1',
    name: 'AutoEncoder Model',
    type: 'autoencoder',
    status: 'active',
    accuracy: 87.5,
    lastTrainedAt: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    name: 'CNN Network Model',
    type: 'cnn',
    status: 'inactive',
    accuracy: 91.2,
    lastTrainedAt: new Date(Date.now() - 172800000)
  }
];

const ModelContext = createContext<ModelContextType>({
  models: [],
  activeModel: null,
  trainingProgress: 0,
  setActiveModel: () => {},
  trainModel: () => {}
});

export const useModel = () => useContext(ModelContext);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [models, setModels] = useState<Model[]>(initialModels);
  const [activeModel, setActiveModel] = useState<Model | null>(initialModels[0]);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const trainModel = (modelId: string) => {
    // Set the model to training status
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: 'training' }
          : model
      )
    );

    // Simulate training progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Update model after training
        setModels(prevModels =>
          prevModels.map(model =>
            model.id === modelId
              ? {
                  ...model,
                  status: 'active',
                  accuracy: Math.min(99.9, model.accuracy + Math.random() * 2),
                  lastTrainedAt: new Date()
                }
              : model
          )
        );
        setTrainingProgress(0);
      }
    }, 500);
  };

  return (
    <ModelContext.Provider
      value={{
        models,
        activeModel,
        trainingProgress,
        setActiveModel,
        trainModel
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};