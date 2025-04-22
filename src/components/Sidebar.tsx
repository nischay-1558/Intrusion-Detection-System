import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BarChart2, Settings, Clock, Activity } from 'lucide-react';
import { useNetworkData } from '../context/NetworkDataContext';

const Sidebar = () => {
  const { trafficStatus } = useNetworkData();

  const statusColors = {
    normal: 'bg-green-500',
    suspicious: 'bg-yellow-500',
    alert: 'bg-red-500'
  };

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold">NetGuardian</h1>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Network Status</span>
          <div className={`h-3 w-3 rounded-full ${statusColors[trafficStatus]}`}></div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="capitalize">{trafficStatus}</span>
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <BarChart2 className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/models"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <Shield className="h-5 w-5" />
              <span>ML Models</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <Clock className="h-5 w-5" />
              <span>History</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="px-4 py-2 text-sm text-gray-400">
          v0.1.0 • ML-powered Protection
        </div>
      </div>
    </div>
  );
};

export default Sidebar;