import React from "react";

const Student = () => {
  const data = localStorage.getItem("payload");
  const { firstName, lastName, school, std } = JSON.parse(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "20px",
        }}
      >
        <h4>Name: {firstName + " " + lastName}</h4>
        <h4>School: {school}</h4>
        <h4>Standard: {std}</h4>
      </div>

      <div
        style={{
          borderBottom: "2px solid #3498db",
        }}
      ></div>
    </div>
  );
};

export default Student;
