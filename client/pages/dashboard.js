import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect } from 'react';
import PieChart from '../PieChart';
import Data from '../utils/Data'
import BarChart from '../BarChart';

Chart.register(CategoryScale);

const Dashboard = () => {
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.category), 
    datasets: [
      {
        label: "Total Spent",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "#560BAD",
          "#38B000",
          "#7209B7",
          "#B5179E",
          "dee2ff",
          "#8e9aaf",
          "#3c6e71",
          "#4FC4F6",
          "#f3ba2f",
          "#75c9c8",
          "#4a4e69",
          "#ef8354",
          "f3d8c7",
        ],
        borderColor: "white",
        borderWidth: 2
      }
    ]
  });

  const [barData, setBarData] = useState({
    labels: Data.map((data) => data.month), 
    datasets: [
      {
        label: "Total Spent",
        data: Data.map((data) => data.userLost),
        backgroundColor: [
          "#560BAD",
          "#38B000",
          "#7209B7",
          "#B5179E",
          "dee2ff",
          "#8e9aaf",
          "#3c6e71",
          "#4FC4F6",
          "#f3ba2f",
          "#75c9c8",
          "#4a4e69",
          "#ef8354",
          "f3d8c7",
        ],
        borderColor: "white",
        borderWidth: 2
      }
    ]
  })
  // res.status(200).json({ budgetIncome: budgetIncome, monthlyExpense: monthlyExpense });
  useEffect(() => {
    fetch('/api/dashboard')
    .then(data => data.json())
    .then(response => {
      console.log('response.monthlyExpense', response.monthlyExpense);
      setMonthlySpent(response.monthlyExpense);
    })
  }, []);
   
  return (
    <div className="page">
      <div>
        Monthly Spent: ${monthlySpent}
      </div>
      <PieChart chartData={chartData} />
      <BarChart chartData={barData} />
    </div>
    )
  }

export default Dashboard;