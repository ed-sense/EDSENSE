import React from "react";

const Percentage = ({ arrayStage, finalScore }) => {
  console.log("Array Stage - ", arrayStage[0]);

  return (
    <div
      style={{
        marginTop: "30px",

        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: "150px" }}>
        <h3>Total Percentage</h3>
        <h3>{finalScore.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Percentage;
