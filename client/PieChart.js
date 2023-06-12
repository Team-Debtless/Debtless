import React from "react";
import { Doughnut } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "% spent per category"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;