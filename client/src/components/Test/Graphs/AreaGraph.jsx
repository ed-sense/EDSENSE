import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  defs,
  Label,
} from "recharts";

const AreaGraph = ({ stageRef }) => {
  const levels = Array.from(
    { length: stageRef.length },
    (_, index) => index + 1
  );
  const scores = stageRef;

  console.log("In Area Graph");
  console.log(scores);

  const data = levels.map((level, index) => ({
    name: `Level ${level}`,
    score: scores[index],
  }));

  return (
    <div style={{ width: "80%", margin: "0px" }}>
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#66a3ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#66a3ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#66a3ff"
          fillOpacity={1}
          fill="url(#colorScore)"
        >
          {data.map((entry, index) => (
            <Label
              key={index}
              content={<CustomLabel score={entry.score} />}
              position="top"
              value={entry.score}
            />
          ))}
        </Area>
      </AreaChart>
    </div>
  );
};

const CustomLabel = ({ score }) => (
  <text x={0} y={0} dy={-16} fontSize={14} fill="#333" textAnchor="middle">
    {score}
  </text>
);

export default AreaGraph;
