import React from 'react';
import { useModel } from '../context/ModelContext';
import ModelCard from '../components/ModelCard';

const Models = () => {
  const { models, activeModel, trainingProgress, setActiveModel, trainModel } = useModel();

  const handleActivate = (model: any) => {
    if (model.id === activeModel?.id) {
      // Deactivate
      setActiveModel(null);
    } else {
      // Activate
      setActiveModel(model);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">ML Models</h1>
        <p className="text-gray-400">
          Manage and train deep learning models for network anomaly detection
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Available Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              id={model.id}
              name={model.name}
              type={model.type}
              status={model.status}
              accuracy={model.accuracy}
              lastTrainedAt={model.lastTrainedAt}
              onActivate={() => handleActivate(model)}
              onTrain={() => trainModel(model.id)}
              trainingProgress={model.status === 'training' ? trainingProgress : undefined}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Model Information</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4">About Our Models</h3>
          
          <div className="mb-6">
            <h4 className="text-blue-400 mb-2">Autoencoder Model</h4>
            <p className="text-gray-300 mb-2">
              Our Autoencoder model is designed to learn normal network traffic patterns and identify anomalies as deviations from this learned normal behavior.
            </p>
            <p className="text-gray-400 text-sm">
              Autoencoders consist of an encoder network that compresses the input into a lower-dimensional representation and a decoder network that attempts to reconstruct the original input. When an anomaly is presented, the reconstruction error is higher than normal, allowing for detection.
            </p>
          </div>
          
          <div>
            <h4 className="text-blue-400 mb-2">CNN Network Model</h4>
            <p className="text-gray-300 mb-2">
              Our Convolutional Neural Network (CNN) model is specialized in detecting patterns in network traffic that might indicate potential intrusions.
            </p>
            <p className="text-gray-400 text-sm">
              CNNs apply convolutional filters to identify spatial patterns in the data. In the context of network security, they can detect complex patterns in packet sequences or traffic flows that are characteristic of various types of attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;