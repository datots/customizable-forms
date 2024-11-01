// Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/api/analytics");
        console.log(response.data); // Inspect the response
        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err); // Log error for debugging
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div>Loading analytics data...</div>;
  }

  if (error) {
    return <div>Error fetching analytics: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric cards */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl">Total Users</h3>
          <p className="text-2xl font-bold">{analyticsData.totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl">Active Users</h3>
          <p className="text-2xl font-bold">{analyticsData.activeUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl">Inactive Users</h3>
          <p className="text-2xl font-bold">{analyticsData.inactiveUsers}</p>
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">User Activity Over Time</h2>
        <BarChart
          width={600}
          height={300}
          data={analyticsData.userActivity}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
          <Bar dataKey="inactiveUsers" fill="#82ca9d" name="Inactive Users" />
        </BarChart>
      </div>
    </div>
  );
};

export default Analytics;
