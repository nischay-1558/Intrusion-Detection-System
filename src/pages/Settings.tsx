import React, { useState } from 'react';
import { Save, RefreshCw, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    dashboard: true,
    highSeverity: true,
    mediumSeverity: true,
    lowSeverity: false
  });
  
  const [thresholds, setThresholds] = useState({
    trafficDeviation: 20,
    connectionSpike: 50,
    anomalyConfidence: 75
  });
  
  const [scanning, setScanning] = useState({
    interval: 5,
    protocols: ['HTTP', 'HTTPS', 'DNS', 'TCP', 'UDP'],
    autoBlock: false
  });

  const handleNotificationChange = (field: string) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };
  
  const handleThresholdChange = (field: string, value: number) => {
    setThresholds(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleProtocolToggle = (protocol: string) => {
    setScanning(prev => {
      const newProtocols = prev.protocols.includes(protocol)
        ? prev.protocols.filter(p => p !== protocol)
        : [...prev.protocols, protocol];
      
      return {
        ...prev,
        protocols: newProtocols
      };
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure system settings and notification preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold">Notification Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Dashboard Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications.dashboard}
                  onChange={() => handleNotificationChange('dashboard')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <h3 className="text-sm font-medium mb-3">Alert on Severity Level</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span>High Severity</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.highSeverity}
                      onChange={() => handleNotificationChange('highSeverity')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Medium Severity</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.mediumSeverity}
                      onChange={() => handleNotificationChange('mediumSeverity')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Low Severity</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.lowSeverity}
                      onChange={() => handleNotificationChange('lowSeverity')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Thresholds */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold">Detection Thresholds</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">Traffic Deviation Threshold (%)</label>
                <span>{thresholds.trafficDeviation}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={thresholds.trafficDeviation}
                onChange={(e) => handleThresholdChange('trafficDeviation', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">Connection Spike Threshold (%)</label>
                <span>{thresholds.connectionSpike}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={thresholds.connectionSpike}
                onChange={(e) => handleThresholdChange('connectionSpike', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">Anomaly Confidence Threshold (%)</label>
                <span>{thresholds.anomalyConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={thresholds.anomalyConfidence}
                onChange={(e) => handleThresholdChange('anomalyConfidence', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>99%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scanning Settings */}
        <div className="bg-gray-800 rounded-lg p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <RefreshCw className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold">Scanning Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Scanning Interval (minutes)</label>
                <select
                  value={scanning.interval}
                  onChange={(e) => setScanning(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 minute</option>
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span>Auto-Block Suspicious IPs</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={scanning.autoBlock}
                      onChange={() => setScanning(prev => ({ ...prev, autoBlock: !prev.autoBlock }))}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Monitored Protocols</label>
              <div className="grid grid-cols-2 gap-2">
                {['HTTP', 'HTTPS', 'DNS', 'FTP', 'SMTP', 'SSH', 'TCP', 'UDP'].map(protocol => (
                  <div key={protocol} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`protocol-${protocol}`}
                      checked={scanning.protocols.includes(protocol)}
                      onChange={() => handleProtocolToggle(protocol)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor={`protocol-${protocol}`} className="ms-2 text-sm font-medium">
                      {protocol}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;