const express = require('express');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Mock network data API
app.get('/api/networkData', (req, res) => {
  // In a real application, this would fetch actual network traffic data
  // For demo purposes, we'll generate some mock data
  const mockData = generateMockData();
  res.json(mockData);
});

// Autoencoder model API
app.post('/api/model/autoencoder/predict', (req, res) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid data format. Expected array of network traffic data.' });
  }
  
  const options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: path.join(__dirname, 'models'),
    args: []
  };
  
  const pyshell = new PythonShell('autoencoder.py', options);
  
  pyshell.send(JSON.stringify({
    command: 'predict',
    data: data
  }));
  
  pyshell.on('message', (message) => {
    try {
      const result = JSON.parse(message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing model output', details: error.message });
    }
  });
  
  pyshell.end((err) => {
    if (err) {
      res.status(500).json({ error: 'Error running model', details: err.message });
    }
  });
});

// CNN model API
app.post('/api/model/cnn/predict', (req, res) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid data format. Expected array of network traffic data.' });
  }
  
  const options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: path.join(__dirname, 'models'),
    args: []
  };
  
  const pyshell = new PythonShell('cnn_model.py', options);
  
  pyshell.send(JSON.stringify({
    command: 'predict',
    data: data
  }));
  
  pyshell.on('message', (message) => {
    try {
      const result = JSON.parse(message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing model output', details: error.message });
    }
  });
  
  pyshell.end((err) => {
    if (err) {
      res.status(500).json({ error: 'Error running model', details: err.message });
    }
  });
});

// Training API for both models
app.post('/api/model/:type/train', (req, res) => {
  const { type } = req.params;
  const { data, labels, epochs } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid data format. Expected array of network traffic data.' });
  }
  
  let scriptName;
  let inputData;
  
  if (type === 'autoencoder') {
    scriptName = 'autoencoder.py';
    inputData = {
      command: 'train',
      data: data,
      epochs: epochs || 10
    };
  } else if (type === 'cnn') {
    scriptName = 'cnn_model.py';
    
    if (!labels || !Array.isArray(labels)) {
      return res.status(400).json({ error: 'CNN model requires labels for training.' });
    }
    
    inputData = {
      command: 'train',
      data: data,
      labels: labels,
      epochs: epochs || 10
    };
  } else {
    return res.status(400).json({ error: 'Invalid model type. Expected "autoencoder" or "cnn".' });
  }
  
  const options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, 'models'),
    args: []
  };
  
  const pyshell = new PythonShell(scriptName, options);
  
  pyshell.send(JSON.stringify(inputData));
  
  pyshell.on('message', (message) => {
    try {
      const result = JSON.parse(message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing model output', details: error.message });
    }
  });
  
  pyshell.end((err) => {
    if (err) {
      res.status(500).json({ error: 'Error running model', details: err.message });
    }
  });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Helper function to generate mock data
function generateMockData() {
  const now = new Date();
  const data = [];
  
  // Generate 24 hours of data in 15-minute intervals
  for (let i = 0; i < 24 * 4; i++) {
    const timestamp = new Date(now);
    timestamp.setMinutes(now.getMinutes() - i * 15);
    
    // Base traffic with some natural variation
    let traffic = 1000 + Math.random() * 500;
    
    // Add time-of-day pattern (higher during business hours)
    const hour = timestamp.getHours();
    if (hour >= 9 && hour <= 17) {
      traffic *= 1.5;
    }
    
    // Add some regular spikes
    if (i % 20 === 0) {
      traffic *= 1.2;
    }
    
    data.push({
      timestamp: timestamp.toISOString(),
      traffic: Math.round(traffic),
    });
  }
  
  // Sort by timestamp ascending
  return data.reverse();
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});