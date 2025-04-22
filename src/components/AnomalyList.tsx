import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

type Anomaly = {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
};

type AnomalyListProps = {
  anomalies: Anomaly[];
};

const AnomalyList: React.FC<AnomalyListProps> = ({ anomalies }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">Recent Anomalies</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        {anomalies.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No anomalies detected</div>
        ) : (
          anomalies.map((anomaly) => (
            <div key={anomaly.id} className="p-4 hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getSeverityColor(anomaly.severity)}`}></span>
                    <h4 className="font-medium">{anomaly.description}</h4>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {anomaly.sourceIp} → {anomaly.destinationIp} • {anomaly.protocol}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">
                    {format(new Date(anomaly.timestamp), 'MMM d, h:mm a')}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnomalyList;