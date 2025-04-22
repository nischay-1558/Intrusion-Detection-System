import { format, subHours, subMinutes } from 'date-fns';

// Generate time series data for the last 24 hours
const generateTimeSeriesData = () => {
  const data = [];
  const now = new Date();
  
  // Generate 24 hours of data in 15-minute intervals
  for (let i = 0; i < 24 * 4; i++) {
    const timestamp = subMinutes(now, i * 15);
    
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
};

// Generate mock anomalies
const generateMockAnomalies = () => {
  const anomalies = [
    {
      id: '1',
      timestamp: subHours(new Date(), 1).toISOString(),
      sourceIp: '192.168.1.105',
      destinationIp: '45.33.22.152',
      protocol: 'TCP',
      severity: 'high',
      description: 'Unusual outbound connection pattern detected'
    },
    {
      id: '2',
      timestamp: subHours(new Date(), 3).toISOString(),
      sourceIp: '218.92.0.123',
      destinationIp: '192.168.1.1',
      protocol: 'HTTP',
      severity: 'medium',
      description: 'Multiple failed login attempts'
    },
    {
      id: '3',
      timestamp: subHours(new Date(), 6).toISOString(),
      sourceIp: '192.168.1.105',
      destinationIp: '8.8.8.8',
      protocol: 'DNS',
      severity: 'low',
      description: 'High volume of DNS queries'
    },
    {
      id: '4',
      timestamp: subHours(new Date(), 12).toISOString(),
      sourceIp: '74.125.224.72',
      destinationIp: '192.168.1.105',
      protocol: 'HTTPS',
      severity: 'medium',
      description: 'Connection to known malicious domain'
    },
    {
      id: '5',
      timestamp: subHours(new Date(), 18).toISOString(),
      sourceIp: '192.168.1.201',
      destinationIp: '104.28.12.39',
      protocol: 'HTTP',
      severity: 'high',
      description: 'Data exfiltration attempt detected'
    },
    {
      id: '6',
      timestamp: subHours(new Date(), 24).toISOString(),
      sourceIp: '172.217.167.78',
      destinationIp: '192.168.1.105',
      protocol: 'TCP',
      severity: 'low',
      description: 'Unusual port scanning activity'
    },
    {
      id: '7',
      timestamp: subHours(new Date(), 36).toISOString(),
      sourceIp: '192.168.1.105',
      destinationIp: '91.189.91.49',
      protocol: 'UDP',
      severity: 'medium',
      description: 'Unusual data transfer pattern'
    }
  ];
  
  return anomalies;
};

export const mockNetworkData = generateTimeSeriesData();
export const mockAnomalies = generateMockAnomalies();