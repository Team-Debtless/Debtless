import { Bar } from "react-chartjs-2";
import React from "react";

const BarChart = ({ chartData }) => {
  return (
    <div className="bar-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Monthly spend vs monthly budget"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;