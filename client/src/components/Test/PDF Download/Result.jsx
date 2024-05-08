import React from 'react'

const Result = ({finalScore}) => {
  return (
    <div
          style={{
            marginTop: "30px",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              padding: "50px 125px",
              fontSize: "50px",
              color: finalScore.toFixed(2) > 60 ? "green" : "red",
              boxShadow: `0 0 5px ${
                finalScore.toFixed(2) > 60 ? "green" : "red"
              }`,
            }}
          >
            {finalScore.toFixed(2) > 60 ? "Safe" : "At Risk"}
          </h2>
        </div>
  )
}

export default Result