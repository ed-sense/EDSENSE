import React from 'react'
import GraphDisplay from './GraphDisplay'

const Graphs = ({stageRef, countRef}) => {
  return (
    <div>
          <GraphDisplay
            stage="Addition"
            stageRef={stageRef[1]}
            countRef={countRef[1]}
          />
          <GraphDisplay
            stage="Subtraction"
            stageRef={stageRef[2]}
            countRef={countRef[2]}
          />
          <GraphDisplay
            stage="Multiplication"
            stageRef={stageRef[3]}
            countRef={countRef[3]}
          />
        </div>
  )
}

export default Graphs