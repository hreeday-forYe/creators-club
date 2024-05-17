import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import Loader from '../../Loader';
import { useGetSubscriptionAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';

const SubscriptionAnalytics = () => {
  const { data, isLoading } = useGetSubscriptionAnalyticsQuery();
  console.log(data);

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

  // Extract analytics data
  const analyticsData = data?.subscriptions?.last12months;

  if (!analyticsData || Object.keys(analyticsData).length === 0) {
    return (
      <div className="h-screen w-full pl-24 md:p-8">
        <p>No data available for last 12 months.</p>
      </div>
    );
  }

  // Convert analytics data to array of objects
  const chartData = Object.entries(analyticsData).map(([month, value]) => ({
    month,
    value,
  }));
  return (
    <div className="h-auto mt-2 w-full md:p-8">
      <div className="mt-30">
        <h3 className="font-semibold text-2xl">Subscription Analytics</h3>
        <p>Recent Subscriptions on the site</p>
      </div>

      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* <SubscriptionAnalytics /> */}
    </div>
  );
};

export default SubscriptionAnalytics;
