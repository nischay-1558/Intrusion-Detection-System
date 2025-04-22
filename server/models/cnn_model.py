import numpy as np
import pickle
import os
import json

class CNNModel:
    """
    Simple simulation of a Convolutional Neural Network model for 
    intrusion detection in network traffic.
    
    In a real implementation, this would use deep learning frameworks
    like TensorFlow or PyTorch.
    """
    
    def __init__(self):
        self.input_shape = (100, 10)  # Time steps x features
        self.num_classes = 5  # Normal + 4 attack types
        
        # Simulate model weights and parameters
        np.random.seed(42)
        self.conv1_weights = np.random.rand(3, 3, 32)  # 3x3 kernel, 32 filters
        self.conv2_weights = np.random.rand(3, 3, 64)  # 3x3 kernel, 64 filters
        self.fc_weights = np.random.rand(64, self.num_classes)
        
        self.class_names = [
            'normal', 'dos', 'probe', 'r2l', 'u2r'
        ]
        
        self.training_history = []
    
    def preprocess(self, data):
        """Preprocess network data for model input"""
        # In a real implementation, this would reshape, normalize, and 
        # transform the network data into appropriate CNN input format
        return np.array(data)
    
    def predict(self, data):
        """Predict attack class probabilities"""
        preprocessed_data = self.preprocess(data)
        
        # Simulate CNN forward pass
        # This is a very simplified simulation - real CNNs would have
        # convolution, pooling, activation functions, etc.
        
        # Generate random prediction scores with bias toward normal traffic
        scores = np.random.rand(len(preprocessed_data), self.num_classes)
        
        # Bias toward normal traffic (70% chance of normal)
        for i in range(len(scores)):
            if np.random.rand() < 0.7:
                scores[i] = np.zeros(self.num_classes)
                scores[i][0] = 0.8 + np.random.rand() * 0.2
            else:
                # Make one attack type more likely
                attack_type = np.random.randint(1, self.num_classes)
                scores[i] = np.random.rand(self.num_classes) * 0.3
                scores[i][attack_type] = 0.7 + np.random.rand() * 0.3
                
            # Normalize to probabilities
            scores[i] = scores[i] / np.sum(scores[i])
                
        return scores
    
    def classify(self, data, threshold=0.5):
        """Classify network data samples"""
        probabilities = self.predict(data)
        predictions = np.argmax(probabilities, axis=1)
        
        # Calculate confidence
        confidence = np.max(probabilities, axis=1)
        
        results = []
        for i in range(len(predictions)):
            results.append({
                'class': self.class_names[predictions[i]],
                'confidence': float(confidence[i]),
                'is_attack': predictions[i] > 0,
                'attack_type': self.class_names[predictions[i]] if predictions[i] > 0 else None,
                'probabilities': {
                    name: float(prob) 
                    for name, prob in zip(self.class_names, probabilities[i])
                }
            })
            
        return results
    
    def train(self, data, labels, epochs=10):
        """Simulate training process"""
        preprocessed_data = self.preprocess(data)
        history = []
        
        # Starting with higher loss
        accuracy = 0.75
        loss = 0.6
        
        for epoch in range(epochs):
            # Simulate gradual improvement in accuracy and loss
            accuracy_improvement = np.random.rand() * 0.03  # Random improvement up to 3%
            loss_improvement = np.random.rand() * 0.07  # Random improvement up to 7%
            
            accuracy = min(0.99, accuracy + accuracy_improvement)
            loss = max(0.05, loss - loss_improvement)
            
            history.append({
                'epoch': epoch + 1,
                'accuracy': float(accuracy),
                'loss': float(loss)
            })
            
            # Simulate weight updates with small random changes
            noise_scale = 0.01 * (1.0 - epoch/epochs)  # Smaller changes in later epochs
            self.conv1_weights += np.random.randn(*self.conv1_weights.shape) * noise_scale
            self.conv2_weights += np.random.randn(*self.conv2_weights.shape) * noise_scale
            self.fc_weights += np.random.randn(*self.fc_weights.shape) * noise_scale
        
        self.training_history = history
        return history
    
    def save(self, filepath):
        """Save model to disk"""
        model_data = {
            'conv1_weights': self.conv1_weights.tolist(),
            'conv2_weights': self.conv2_weights.tolist(),
            'fc_weights': self.fc_weights.tolist(),
            'input_shape': self.input_shape,
            'num_classes': self.num_classes,
            'class_names': self.class_names
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
    
    def load(self, filepath):
        """Load model from disk"""
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        self.conv1_weights = np.array(model_data['conv1_weights'])
        self.conv2_weights = np.array(model_data['conv2_weights'])
        self.fc_weights = np.array(model_data['fc_weights'])
        self.input_shape = model_data['input_shape']
        self.num_classes = model_data['num_classes']
        self.class_names = model_data['class_names']

# Example usage for API endpoint
if __name__ == "__main__":
    # Read input data from stdin
    input_data = json.loads(input())
    command = input_data.get('command', 'predict')
    data = np.array(input_data.get('data', []))
    
    model = CNNModel()
    
    if command == 'train':
        labels = np.array(input_data.get('labels', []))
        epochs = input_data.get('epochs', 10)
        history = model.train(data, labels, epochs)
        print(json.dumps({'status': 'success', 'training_history': history}))
    elif command == 'predict':
        results = model.classify(data)
        print(json.dumps({'status': 'success', 'results': results}))
    else:
        print(json.dumps({'status': 'error', 'message': 'Unknown command'}))