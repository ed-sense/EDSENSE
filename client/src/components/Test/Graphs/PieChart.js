import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const CustomPieChart = ({ countRef }) => {
  const data = [
    { name: "Correct", value: countRef[0] },
    { name: "Incorrect", value: countRef[1] },
    { name: "Special", value: countRef[2] },
  ];

  console.log("Count Ref - " + countRef);

  const COLORS = ["#00cc00", "#FFB534", "#ff3333"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        cx={200}
        cy={155}
        innerRadius={100}
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend align="center" verticalAlign="bottom" height={35} />
    </PieChart>
  );
};

export default CustomPieChart;
