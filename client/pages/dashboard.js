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
  const [monthlyBudget, setMonthlyBudget] = useState(0);
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
        borderWidth: 2,
        color: 'white',
      }
    ]
  })
  // res.status(200).json({ budgetIncome: budgetIncome, monthlyExpense: monthlyExpense });
  // budgetIncome: { monthly_income: '$0.00', monthly_budget: '$102.00' },
  useEffect(() => {
    fetch('/api/dashboard')
    .then(data => data.json())
    .then(response => {
      setMonthlySpent(response.monthlyExpense);
      // add conditional if monthly_budget is undefined to display $0
      setMonthlyBudget(response.budgetIncome.monthly_budget);
    })
  }, []);
   
  return (
    <div className="page">
      <h2 className="title left">Dashboard</h2>
      <h3 className='sub-title left'>
        Your Monthly Spend: ${monthlySpent}
      </h3>
      <h3 className='sub-title left'>
        Your Monthly Budget: {monthlyBudget}
      </h3>
      <PieChart chartData={chartData} />
      <BarChart chartData={barData} />
    </div>
    )
  }

export default Dashboard;
