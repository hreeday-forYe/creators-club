// import Loader from '../../Loader';
// import React from 'react';
// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   XAxis,
//   Label,
//   LabelList,
//   YAxis,
//   LineChart,
//   Line,
// } from 'recharts';
// import { useGetPostAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
// import { useEffect } from 'react';
// import UserAnalytics from './UserAnalytics';
// import CreatorAnalytics from './CreatorAnalytics';
// const PostsAnalytics = () => {
//   const { data, isLoading } = useGetPostAnalyticsQuery();
//   // console.log(data);

//   // const analyticsData = [
//   //   { name: 'Jun 2024', uv: 3 },
//   //   { name: 'July 2024', uv: 2 },
//   //   { name: 'August 2023', uv: 5 },
//   //   { name: 'Sept 2023', uv: 7 },
//   //   { name: 'Ocotober 2023', uv: 2 },
//   //   { name: 'Nov 2023', uv: 5 },
//   //   { name: 'December 2023', uv: 7 },
//   // ];

//   // dynamic array data
//   const analyticsData = [];

//   useEffect(() => {
//     if (data && data?.posts) {
//       // Iterate over the keys (months) of last12Months object
//       Object.keys(data?.posts?.last12months).forEach((key) => {
//         const value = data?.posts?.last12months[key];
//         // console.log(`Key: ${key}, Value: ${value}`);
//         analyticsData.push({ name: key, uv: value });
//       });
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
//             <h3 className="font-semibold text-2xl">Post Analytics</h3>
//             <p>Recent created Posts analytics data{''}</p>
//           </div>

//           <div className="flex items-center border-2 justify-center mt-2 h-[60%] w-[100%]">
//             <ResponsiveContainer width="90%" height="50%">
//               <BarChart
//                 width={150}
//                 height={300}
//                 data={analyticsData}
//                 barCategoryGap={'5%'}
//                 barGap={2}
//               >
//                 <XAxis dataKey={'name'} interval={0} offset={10}>
//                   <Label offset={20} position={'insideBottom'} />
//                 </XAxis>
//                 <YAxis
//                   domain={[minValue, 'auto']}
//                   label={{
//                     value: 'Number of Posts',
//                     angle: -90,
//                     position: 'insideLeft',
//                     style: {
//                       textAnchor: 'middle',
//                       fontSize: 16,
//                       fontWeight: 'semibold',
//                       fill: '#333',
//                     },
//                   }}
//                 />
//                 <Bar dataKey="uv" fill="#8884d8" barSize={60}>
//                   <LabelList dataKey="uv" position={'top'} />
//                 </Bar>
//               </BarChart>
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
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';
import { useGetPostAnalyticsQuery } from '../../../redux/slices/analyticsApiSlice';
import Loader from '../../Loader';

const PostsAnalytics = () => {
  const { data, isLoading } = useGetPostAnalyticsQuery();
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    if (data && data.posts && data.posts.last12months) {
      const newData = Object.entries(data.posts.last12months).map(
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
        <div className="h-auto w-full md:p-8">
          <div>
            <h3 className="font-semibold text-2xl">Post Analytics</h3>
            <p>Recent created Posts analytics data</p>
          </div>

          <div className="flex items-center justify-center mt-2 h-[60%] w-[100%]">
            <ResponsiveContainer width="90%" height={400}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="name" interval={0} offset={10} />
                <YAxis
                  domain={[minValue, 'auto']}
                  label={{
                    value: 'Number of Posts',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      textAnchor: 'middle',
                      fontSize: 16,
                      fontWeight: 'bold',
                      fill: '#333',
                    },
                  }}
                />
                <Bar dataKey="uv" fill="#8884d8" barSize={60}>
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsAnalytics;
