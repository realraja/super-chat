// src/components/LineChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Last Messages',
        data: [0, 0, 0, 0, 0, 0, 1],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
