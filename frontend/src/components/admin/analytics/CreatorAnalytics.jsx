// import React from 'react';
// import {
//   AreaChart,
//   Area,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from 'recharts';
// import { useGetCreatorsAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
// import Loader from '../../Loader';
// const CreatorAnalytics = () => {
//   const { data, isLoading } = useGetCreatorsAnalyticsQuery();
//   // console.log(data);
//   // Check if data is loading or if analyticsData is not yet available
//   if (isLoading) {
//     return <Loader />; // Placeholder for loading state
//   }
//   const analyticsData = data?.creators?.last12months;
//   console.log(analyticsData);
//   // Convert analytics data object into array of objects
//   const chartData = Object.entries(analyticsData).map(([month, value]) => ({
//     month,
//     value,
//   }));
//   console.log(chartData);
//   return (
//     <>
//       <div className="h-screen w-full pl-24 md:p-8">
//         <div className="mt-[20px]">
//           <h3 className="font-semibold text-2xl">Post Analytics</h3>
//           <p>Last 12 months Posts analytics data{''}</p>
//         </div>

//         <div className="flex items-center border-2 justify-center mt-2 h-[60%] w-[100%]">
//           <ResponsiveContainer width="100%" height={400}>
//             <AreaChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#8884d8"
//                 fill="#8884d8"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//         {/* <CreatorAnalytics /> */}
//       </div>
//     </>
//   );
// };

// export default CreatorAnalytics;
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
import { useGetCreatorsAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
import Loader from '../../Loader';
import SubscriptionAnalytics from './SubscriptionAnalytics';

const CreatorAnalytics = () => {
  const { data, isLoading } = useGetCreatorsAnalyticsQuery();

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

  // Extract analytics data
  const analyticsData = data?.creators?.last12months;

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
    <div className="h-auto w-full md:p-8 border-3 border-red-500">
      <div>
        <h3 className="font-semibold text-2xl">Creators Analytics</h3>
        <p>Recent Cretors signup to the site</p>
      </div>

      <div className="h-80">
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
    </div>
  );
};

export default CreatorAnalytics;
