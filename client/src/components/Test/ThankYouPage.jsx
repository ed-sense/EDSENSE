import PdfGenerator from "./PDF Download/PdfGenerator";

const graph = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
};

const ThankYouPage = ({ countRef, stageRef, arrayStage }) => {
  return (
    <div className="graph-display" style={graph}>

      {/* Div added for Adding Margin */}
      <div style={{ marginTop: "80px" }}></div>

      <div>
        <PdfGenerator
          countRef={countRef}
          stageRef={stageRef}
          arrayStage={arrayStage}
        />
      </div>
    </div>
  );
};

export default ThankYouPage;
