// export const generateLast12Monthsdata = async (model) => {
//   const last12months = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   for (let i = 11; i >= 0; i--) {
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() - i * 28
//     );
//     const startDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() - i * 28
//     );

//     const monthYear = endDate.toLocaleString('default', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//     //  console.log("Month year", monthYear)
//     //  console.log("start year", startDate)
//     //  console.log("end year", endDate)
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });
//     last12months.push({ month: monthYear, count });
//   }
//   return { last12months };
// };

export const generateLast12Monthsdata = async (model) => {
  const last12MonthsData = await model.find({
    createdAt: { $gte: Date.now() - 86400 * 24 * 12 * 1000 },
  });
  console.log(last12MonthsData);
  const dataMap = {};
  for (let data of last12MonthsData) {
    const monthYear = new Date(data.createdAt).toLocaleString('default', {
      month: 'short',
    });

    if (dataMap[monthYear]) {
      dataMap[monthYear]++;
    } else {
      dataMap[monthYear] = 1;
    }
  }
  // console.log(last12MonthsData, dataMap);
  return {
    last12months: dataMap,
  };
};
