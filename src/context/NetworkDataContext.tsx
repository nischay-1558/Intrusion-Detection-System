import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockNetworkData, mockAnomalies } from '../utils/mockData';

type NetworkDataContextType = {
  networkData: any[];
  anomalies: any[];
  loading: boolean;
  fetchNetworkData: () => void;
  trafficStatus: 'normal' | 'suspicious' | 'alert';
};

const NetworkDataContext = createContext<NetworkDataContextType>({
  networkData: [],
  anomalies: [],
  loading: false,
  fetchNetworkData: () => {},
  trafficStatus: 'normal',
});

export const useNetworkData = () => useContext(NetworkDataContext);

export const NetworkDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkData, setNetworkData] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trafficStatus, setTrafficStatus] = useState<'normal' | 'suspicious' | 'alert'>('normal');

  const fetchNetworkData = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll use mock data
      setTimeout(() => {
        setNetworkData(mockNetworkData);
        setAnomalies(mockAnomalies);
        
        // Determine traffic status based on anomalies
        const recentAnomalies = mockAnomalies.filter(
          a => new Date(a.timestamp).getTime() > Date.now() - 3600000
        );
        
        if (recentAnomalies.some(a => a.severity === 'high')) {
          setTrafficStatus('alert');
        } else if (recentAnomalies.length > 0) {
          setTrafficStatus('suspicious');
        } else {
          setTrafficStatus('normal');
        }
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching network data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchNetworkData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <NetworkDataContext.Provider 
      value={{ 
        networkData, 
        anomalies, 
        loading, 
        fetchNetworkData,
        trafficStatus
      }}
    >
      {children}
    </NetworkDataContext.Provider>
  );
};