// src/components/AdminPage.js

import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminHome = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-2xl font-bold">LOGO.</span>
        </div>
        <div className="flex-1 p-4">
          <ul>
            <li className="mb-4"><p className="flex items-center"><span className="mr-2">🏠</span> Dashboard</p></li>
            <li className="mb-4"><p className="flex items-center"><span className="mr-2">👤</span> User</p></li>
            <li className="mb-4"><p className="flex items-center"><span className="mr-2">👥</span> Group</p></li>
            <li className="mb-4"><p className="flex items-center"><span className="mr-2">💬</span> Message</p></li>
            <li><p className="flex items-center"><span className="mr-2">🔓</span> Logout</p></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900">
        <div className="flex justify-between  items-center mb-6">
          <input type="text" placeholder="Search..." className="p-2 border rounded" />
          <span className="text-white">Friday, 23 February 2024</span>
        </div>

        <div className="flex flex-wrap justify-around gap-6 mb-6">
          <div className="bg-gray-800 text-white w-[60%] p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Last Messages</h2>
            <LineChart />
          </div>

          <div className="bg-gray-800 text-white w-[30%] p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Chat Statistics</h2>
            <DoughnutChart />
          </div>

          <div className="bg-gray-800 p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-white">Overview</h2>
            <div className="flex justify-around text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">20</div>
                <div>Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div>Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">393</div>
                <div>Messages</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-white">Overview</h2>
            <div className="flex justify-around text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">20</div>
                <div>Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div>Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">393</div>
                <div>Messages</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-white">Overview</h2>
            <div className="flex justify-around text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">20</div>
                <div>Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div>Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">393</div>
                <div>Messages</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};

export default AdminHome;

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
