// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   LabelList,
// } from 'recharts';
// import { useGetUsersAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
// import Loader from '../../Loader';

// const PostsAnalytics = () => {
//   const { data, isLoading } = useGetUsersAnalyticsQuery();
//   console.log(data);
//   const [analyticsData, setAnalyticsData] = useState([]);

//   useEffect(() => {
//     if (data && data.users && data.users.last12months) {
//       const newData = Object.entries(data.users.last12months).map(
//         ([month, value]) => ({
//           name: month,
//           uv: value,
//         })
//       );
//       setAnalyticsData(newData);
//     }
//   }, [data]);

//   const minValue = 0;

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="h-auto w-full md:p-8 border-3 border-red-500">
//           <div>
//             <h3 className="font-semibold text-2xl">User Analytics</h3>
//             <p>Recent Signed Up Users analytics data</p>
//           </div>

//           <div className="flex items-center border-2 justify-center mt-2 h-[60%] w-[100%]">
//             <ResponsiveContainer width="90%" height={400}>
//               <LineChart data={analyticsData}>
//                 <XAxis dataKey="name" interval={0} offset={10} />
//                 <YAxis
//                   domain={[minValue, 'auto']}
//                   label={{
//                     value: 'Number of Users',
//                     angle: -90,
//                     position: 'insideLeft',
//                     style: {
//                       textAnchor: 'middle',
//                       fontSize: 16,
//                       fontWeight: 'bold',
//                       fill: '#333',
//                     },
//                   }}
//                 />
//                 <Line dataKey="uv" fill="#8884d8" barSize={60}>
//                   <LabelList dataKey="uv" position="top" />
//                 </Line>
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PostsAnalytics;

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';
import { useGetUsersAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
import Loader from '../../Loader';

const UserAnalytics = () => {
  const { data, isLoading } = useGetUsersAnalyticsQuery();
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    if (data && data.users && data.users.last12months) {
      const newData = Object.entries(data.users.last12months).map(
        ([month, value]) => ({
          name: month,
          uv: value,
        })
      );
      setAnalyticsData(newData);
    }
  }, [data]);

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-auto w-full md:p-8 border-3 border-gray-300 rounded-lg">
          <div className="mb-4">
            <h3 className="font-semibold text-2xl mb-2">User Analytics</h3>
            <p className="text-gray-600">
              Recent Signed Up Users analytics data
            </p>
          </div>

          <div className="flex items-center justify-center h-[400px]">
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={analyticsData}>
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                <YAxis
                  domain={[minValue, 'auto']}
                  label={{
                    value: 'Number of Users',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#333',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                >
                  <LabelList dataKey="uv" position="top" />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
