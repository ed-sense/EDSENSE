import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarGraph = ({ arrayStage }) => {
  console.log(arrayStage);
  const scores = arrayStage;
  const levels = Array.from({ length: scores.length }, (_, index) => index + 1);

  const data = levels.map((level, index) => ({
    level,
    score: scores[index],
  }));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Level-wise Scores Bar Graph</h2>
      <div style={{ width: "80%" }}>
        <BarChart
          width={850}
          height={400}
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="level"
            label={{ value: "Levels", position: "outsideBottom", dy: 10 }}
          />
          <YAxis
            label={{
              value: "Score",
              angle: -90,
              position: "insideLeft",
              dx: -10,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#66a3ff" />{" "}
          {/* Custom color: Light Blue */}
        </BarChart>
      </div>
    </div>
  );
};

export default BarGraph;
