// src/App.js
import React from 'react';
import ChartComponent from './components/chart';

const mockData = {
  // Add your dataset here
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const customizationOptions = {
  xAxis: {
    // Add customization options for x-axis
  },
  yAxis: {
    // Add customization options for y-axis
  },
};

function App() {
  return (
    <div className="App">
      <h1>Data Visualization Chart</h1>
      <ChartComponent data={mockData} chartType="bar" customizationOptions={customizationOptions} />
      {/* Add UI controls to toggle between chart types and customize options */}
    </div>
  );
}

export default App;
