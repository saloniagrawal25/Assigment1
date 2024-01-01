// // src/ChartComponent.js
// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Replace with your server URL

// const ChartComponent = ({ chartType, customizationOptions }) => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Data',
//         data: [],
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     socket.on('updateChartData', (newData) => {
//       setData(newData);
//     });

//     return () => {
//       socket.off('updateChartData');
//     };
//   }, []);

//   const options = {
//     // Add customization options here
//     scales: {
//       x: { ...customizationOptions.xAxis },
//       y: { ...customizationOptions.yAxis },
//     },
//   };

//   const Chart = chartType === 'bar' ? Bar : Line;

//   return <Chart data={data} options={options} />;
// };

// export default ChartComponent;
// src/ChartComponent.js
// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Replace with your server URL

// const ChartComponent = ({ chartType, customizationOptions }) => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Data',
//         data: [],
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     socket.on('updateChartData', (newData) => {
//       // Remove a random data point (for example, the first data point)
//       const modifiedData = {
//         ...newData,
//         datasets: newData.datasets.map((dataset) => ({
//           ...dataset,
//           data: dataset.data.slice(1), // Remove the first data point
//         })),
//       };

//       setData(modifiedData);
//     });

//     return () => {
//       socket.off('updateChartData');
//     };
//   }, []);

//   const options = {
//     // Add customization options here
//     scales: {
//       x: { ...customizationOptions.xAxis },
//       y: { ...customizationOptions.yAxis },
//     },
//   };

//   const Chart = chartType === 'bar' ? Bar : Line;

//   return <Chart data={data} options={options} />;
// };

// export default ChartComponent;
// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import io from 'socket.io-client';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from 'chart.js'
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, )

// const socket = io('http://localhost:3001'); // Replace with your server URL

// const ChartComponent = ({ chartType, customizationOptions }) => {
// const [data, setData] = useState({
// labels: [],
// datasets: [
// {
// label: 'Data',
// data: [],
// backgroundColor: 'rgba(75,192,192,0.2)',
// borderColor: 'rgba(75,192,192,1)',
// borderWidth: 1,
// },
// ],
// });

// useEffect(() => {
// socket.on('updateChartData', (newData) => {
// setData(newData);
// });

// return () => {
// socket.off('updateChartData');
// };
// }, []);

// const options = {
// // Add customization options here
// scales: {
// x: { ...customizationOptions.xAxis },
// y: { ...customizationOptions.yAxis },
// },
// };

// const Chart = chartType === 'bar' ? Bar : Line;

// return <Chart data={data} options={options} />;
// };

// export default ChartComponent;
// src/ChartComponent.js
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const socket = io('http://localhost:3001'); // Connect to the backend server

const ChartComponent = ({ chartType, customizationOptions }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Data',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    socket.on('updateChartData', (newData) => {
      setData(newData);
    });

    return () => {
      socket.off('updateChartData');
    };
  }, []);

  const options = {
    scales: {
      x: { ...customizationOptions.xAxis },
      y: { ...customizationOptions.yAxis },
    },
  };

  const Chart = chartType === 'bar' ? Bar : Line;

  return <Chart data={data} options={options} />;
};

export default ChartComponent;
