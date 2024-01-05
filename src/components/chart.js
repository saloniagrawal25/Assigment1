import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import io from "socket.io-client";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const socket = io("http://localhost:3001"); // Connect to the backend server

const ChartComponent = ({ chartType, customizationOptions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Data",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const createUpdatedData = (newData) => {
    let receivedData = newData
      .filter((data) => data?.end_year !== "" && data?.intensity !== "")
      .sort((a, b) => a.end_year - b.end_year);
    if (receivedData?.length > 0) {
      let updatedData = { ...chartData };
      updatedData.labels = receivedData.map((row) => row?.end_year);
      updatedData.datasets[0].data = receivedData.map((row) => row?.intensity);
      setChartData(updatedData);
    }
  };

  useEffect(() => {
    socket.on("updateChartData", (newData) => {
      createUpdatedData(newData);
    });
    return () => {
      socket.off("updateChartData");
    };
  }, []);

  const options = {
    scales: {
      x: { ...customizationOptions.xAxis },
      y: { ...customizationOptions.yAxis },
    },
  };

  const Chart = chartType === "bar" ? Bar : Line;

  if (chartData?.labels?.length === 0) return <></>;

  return <Chart data={chartData} options={options} />;
};

export default ChartComponent;
