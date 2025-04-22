import React from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

type TrafficChartProps = {
  data: any[];
  anomalies: any[];
};

const TrafficChart: React.FC<TrafficChartProps> = ({ data, anomalies }) => {
  // Process data to include anomaly markers
  const processedData = data.map(point => {
    const isAnomaly = anomalies.some(
      anomaly => {
        const anomalyTime = new Date(anomaly.timestamp).getTime();
        const pointTime = new Date(point.timestamp).getTime();
        return Math.abs(anomalyTime - pointTime) < 60000; // Within 1 minute
      }
    );
    
    return {
      ...point,
      isAnomaly
    };
  });

  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), 'HH:mm');
  };

  const formatTooltip = (value: any, name: string) => {
    if (name === 'traffic') {
      return [`${value} packets/s`, 'Traffic'];
    }
    return [value, name];
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <Tooltip 
            formatter={formatTooltip}
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              borderColor: '#374151',
              color: 'white'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
          />
          {/* Overlay red dots for anomalies */}
          {processedData.map((entry, index) => (
            entry.isAnomaly && (
              <circle
                key={`anomaly-${index}`}
                cx={`${index * (100 / processedData.length)}%`}
                cy={`${100 - (entry.traffic / Math.max(...processedData.map(d => d.traffic)) * 100)}%`}
                r={4}
                fill="red"
              />
            )
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;