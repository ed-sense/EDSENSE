import React, { useRef } from "react";
import BarGraph from "../Graphs/BarGraph";
import { useReactToPrint } from "react-to-print";
import Header from "./Header";
import Student from "./Student";
import Percentage from "./Percentage";
import Result from "./Result";
import Graphs from "./Graphs";
import Logout from "./Buttons/Logout";
import "./CSS/PDFGenerator.css";

const PdfGenerator = ({ countRef, stageRef, arrayStage }) => {
  var finalScore =
    ((arrayStage[0] + arrayStage[1] + arrayStage[2]) / (52.8 + 52.8 + 19.8)) *
    100;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="display-page">
      <div className="report-page" ref={componentRef}>
        <Header /> {/* Displays the Title */}
        <Student /> {/* Displays the Student Details */}
        <Graphs stageRef={stageRef} countRef={countRef} /> {/* Graph Display */}
        <BarGraph arrayStage={arrayStage} /> {/* Stage Wise Total Score */}
        <Percentage arrayStage={arrayStage} finalScore={finalScore} />
        {/* Total Percentage */}
        <Result finalScore={finalScore} /> {/* Final Decision */}
      </div>

      <div className="logout-button">
        {/* Logout Button */}
        <Logout />

        <button className="generate-pdf" onClick={handlePrint}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default PdfGenerator;
