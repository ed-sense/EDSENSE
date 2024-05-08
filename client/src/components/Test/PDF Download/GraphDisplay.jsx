import React from "react";

import AreaGraph from "../Graphs/AreaGraph";
import PieChart from "../Graphs/PieChart";

// ! Internal CSS -

  // 1. h2 element

  const heading = {
    textAlign: "center",
    margin: "50px auto",
    textDecoration: "underline",
  };

  // 2. div element

  const divElement = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "70px",
    margin: " 100px 0px",
    padding: "20px",
  };

  // 3. Graphs
  const graph = {
    width: "100%",
    height: "300px",
  };

  // * Internal CSS End

const GraphDisplay = ({ stage, stageRef, countRef }) => {
  
  return (
    <div>
      <h2 style={heading}>Level-wise Scores Graph for {stage}</h2>
      <div style={divElement}>
        <div>
          <AreaGraph stage="Addition" stageRef={stageRef} style={graph} />
        </div>
        <div>
          <PieChart countRef={countRef} style={graph} />
        </div>
      </div>
    </div>
  );
};

export default GraphDisplay;
