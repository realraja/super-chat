// src/components/DoughnutChart.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
  const data = {
    labels: ['Single Chats', 'Group Chats'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
