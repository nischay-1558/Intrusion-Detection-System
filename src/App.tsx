import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Models from './pages/Models';
import Settings from './pages/Settings';
import History from './pages/History';
import { NetworkDataProvider } from './context/NetworkDataContext';
import { ModelProvider } from './context/ModelContext';

function App() {
  return (
    <Router>
      <NetworkDataProvider>
        <ModelProvider>
          <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/models" element={<Models />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </ModelProvider>
      </NetworkDataProvider>
    </Router>
  );
}

export default App;