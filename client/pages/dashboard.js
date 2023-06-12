import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import PieChart from '../PieChart';
import Data from '../utils/Data'
import BarChart from '../BarChart';

Chart.register(CategoryScale);

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Total Spent",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "purple"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
   
  return (
    <div className="page">
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
    </div>
    )
  }

export default Dashboard;