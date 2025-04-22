import React, { useState } from 'react';
import { useNetworkData } from '../context/NetworkDataContext';
import AnomalyList from '../components/AnomalyList';
import { Calendar, Search } from 'lucide-react';

const History = () => {
  const { anomalies } = useNetworkData();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredAnomalies = anomalies.filter(anomaly => {
    // Search filter
    const matchesSearch = 
      anomaly.sourceIp.includes(searchTerm) || 
      anomaly.destinationIp.includes(searchTerm) ||
      anomaly.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anomaly.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const anomalyDate = new Date(anomaly.timestamp);
    const now = new Date();
    let matchesDate = true;
    
    if (dateFilter === 'today') {
      matchesDate = anomalyDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = anomalyDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = anomalyDate >= monthAgo;
    }
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Anomaly History</h1>
        <p className="text-gray-400">
          Review and analyze detected network anomalies
        </p>
      </div>

      <div className="mb-6 bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by IP, protocol, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Anomaly Timeline</h2>
            <span className="text-sm text-gray-400">{filteredAnomalies.length} events</span>
          </div>
        </div>
        
        <AnomalyList anomalies={filteredAnomalies} />
      </div>
    </div>
  );
};

export default History;