import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect } from 'react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import Data from '../utils/Data'

Chart.register(CategoryScale);


const pieDataSet = [
  {
    label: "Total Spent",
    data: [],
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
    borderWidth: 0,
    barPercentage: 0.2,
  }
];

const Dashboard = () => {
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: pieDataSet,
  });

  const [barData, setBarData] = useState({
    labels: ['Monthly Spend', 'Monthly Budget'],
    datasets: pieDataSet,
  })
  // res.status(200).json({ budgetIncome: budgetIncome, monthlyExpense: monthlyExpense });
  // budgetIncome: { monthly_income: '$0.00', monthly_budget: '$102.00' },
  useEffect(() => {
    fetch('/api/dashboard')
    .then(data => data.json())
    .then(response => {
      const category = []
      const totalSpent = [];
      for(let key in response.categoricalExpense){
        category.push(key);
        totalSpent.push(`${response.categoricalExpense[key]}`);
      }
      setPieData(prevState => ({
        ...prevState,
        labels: category,
        datasets: [{...prevState.datasets[0], data: totalSpent}]
      }));
      setBarData(prevState => ({
        ...prevState,
        // TODO: provide the budgetIncome obj from the backend as a number instead of string
        datasets: [{...prevState.datasets[0], data: [response.monthlyExpense, Number(response.budgetIncome.monthly_budget.replace(/[^0-9.-]+/g,""))]}]
      }));

      setMonthlySpent(response.monthlyExpense);

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
      <di className='chartsContainer'>
        <PieChart chartData={pieData} />
        <BarChart chartData={barData} />
      </di>
    </div>
    )
  }

export default Dashboard;
