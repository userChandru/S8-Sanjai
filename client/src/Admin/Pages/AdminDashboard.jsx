import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

const adminData = [
  { month: 'Jan', totalUsers: 150, activeBusinesses: 45, revenue: 12000 },
  { month: 'Feb', totalUsers: 220, activeBusinesses: 65, revenue: 15000 },
  { month: 'Mar', totalUsers: 280, activeBusinesses: 85, revenue: 18500 },
  { month: 'Apr', totalUsers: 350, activeBusinesses: 95, revenue: 22000 },
  { month: 'May', totalUsers: 420, activeBusinesses: 120, revenue: 28000 },
  { month: 'Jun', totalUsers: 500, activeBusinesses: 150, revenue: 35000 },
  { month: 'Jul', totalUsers: 580, activeBusinesses: 180, revenue: 42000 },
];

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-10 overflow-hidden relative bg-gray-100 w-full h-60">
        <div className="space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Admin Dashboard</p>
          <p className="text-gray-400 text-4xl font-semibold">
            Overview & Analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Growth Metrics Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalUsers" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Total Users"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="activeBusinesses" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Active Businesses"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Platform Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="revenue" 
                fill="#6366f1"
                name="Monthly Revenue"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2">580</p>
          <p className="text-sm mt-2">↑ 15% from last month</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Active Businesses</h3>
          <p className="text-3xl font-bold mt-2">180</p>
          <p className="text-sm mt-2">↑ 20% from last month</p>
        </div>
        <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₹42,000</p>
          <p className="text-sm mt-2">↑ 25% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 