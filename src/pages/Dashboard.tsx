import React from 'react';
import { useNetworkData } from '../context/NetworkDataContext';
import { useModel } from '../context/ModelContext';
import TrafficChart from '../components/TrafficChart';
import AnomalyList from '../components/AnomalyList';
import { Shield, Database, Server, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { networkData, anomalies, loading, trafficStatus } = useNetworkData();
  const { activeModel } = useModel();

  const recentAnomalies = anomalies.slice(0, 5);

  const statsCards = [
    {
      title: 'Active Model',
      value: activeModel?.name || 'None',
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      color: 'bg-blue-950'
    },
    {
      title: 'Model Accuracy',
      value: activeModel ? `${activeModel.accuracy.toFixed(1)}%` : 'N/A',
      icon: <Database className="h-5 w-5 text-green-400" />,
      color: 'bg-green-950'
    },
    {
      title: 'Scanned Packets',
      value: '1.2M',
      icon: <Server className="h-5 w-5 text-purple-400" />,
      color: 'bg-purple-950'
    },
    {
      title: 'Anomalies (24h)',
      value: anomalies.length.toString(),
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      color: 'bg-red-950'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Network Dashboard</h1>
        <p className="text-gray-400">
          Real-time network traffic monitoring and anomaly detection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`rounded-lg p-4 ${card.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 mb-1">{card.title}</p>
                <p className="text-xl font-semibold">{card.value}</p>
              </div>
              <div className="p-2 rounded-full bg-gray-800">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Network Traffic</h2>
          <div className="h-72">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <TrafficChart data={networkData} anomalies={anomalies} />
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Traffic Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                trafficStatus === 'normal' ? 'bg-green-900 text-green-300' :
                trafficStatus === 'suspicious' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {trafficStatus.charAt(0).toUpperCase() + trafficStatus.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Monitoring</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Database</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                Connected
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Active Monitoring</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>HTTP Traffic</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>DNS Requests</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>TCP Connections</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>UDP Traffic</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <AnomalyList anomalies={recentAnomalies} />
      </div>
    </div>
  );
};

export default Dashboard;