//! Importing Statements Start
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

//! Component Imports
import TestCompletePage from "./ThankYouPage";
import ModalTest from "./ModalTest";
import StageOverlay from "./Overlays/stageOverlay";

//! JSON Imports - Data imported from data10.json
import data from "./data10.json";

//! CSS Imports
import "./Test.css";
import "./TestMediaQuery.css";

//! Toast Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//* Importing Statements END

const arr_c = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //This is the array which will have numbers from 1 to 20
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ---------- Array Creation to store the answer ------------------------------------------------------------------------------

const Q_arr = []; //Array to store the path which system takes
const R_ans = []; //Array to store right ans
const W_ans = []; //Array to store wrong ans
const SpW_ans = []; //Array to store Specific wrong ans

//
const Timer = []; // Array to store Timer
//

//! Arrays for New Algorithm Start

const arrayLevel = [];
const arrayStage = [];

//* Arrays for New Algorithm End

//! Variables for New Algorithm Start

const fast = 1.2;
const slow = 0.9;
const ans_r = 1;
const ans_w = -0.7;
const ans_spw = -1;

let score = 0;
let levelScore = 0;
let stageScore = 0;

let level = 1;
let stage = 1;

let support = 0;

var randomIndex;

//* Variables for New Algorithm End

// ---------- Array Creation to store the answer End ----------------------------------------------------------------------------

const payload = JSON.parse(localStorage.getItem("payload"));
console.log(payload);
const Test = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [exhaust, setExhaust] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [dec, setDec] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false); // Added state for tracking quiz start

  // Use States for Response Time module -------------------------------------------------------------------------------------------------

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Use States End ----------------------------------------------------------------------------------------------------------------------

  //
  // Global variable to display stage + level
  const [strDisplay, setStrDisplay] = useState("");
  const [hintCounter, setHintCounter] = useState(1);
  //

  //! Modal Component for Hint Start

  const [modalOpen, setModalOpen] = useState(false);

  //* Modal Component for Hint End

  // ! Store Answer's Count

  const countersRef = useRef({
    1: [0, 0, 0],
    2: [0, 0, 0],
    3: [0, 0, 0],
  });

  const updateCounters = (stage, condition) => {
    const counters = countersRef.current;

    if (condition === "correct") {
      counters[stage][0]++; // Increment correct count
    } else if (condition === "specialWrong") {
      counters[stage][2]++; // Increment special wrong count
    } else {
      counters[stage][1]++; // Increment incorrect count
    }
  };

  // * Store Answer's Count

  // ! Storing Level wise Score for barchart

  const stageObjectRef = useRef({
    1: Array(16).fill(0),
    2: Array(16).fill(0),
    3: Array(6).fill(0),
  });

  const stageObjectRefFunction = (stage, level, levelScore) => {
    if (
      stageObjectRef.current[stage] &&
      level > 0 &&
      level <= stageObjectRef.current[stage].length
    ) {
      // Setting a value in the array for the specified stage and level
      stageObjectRef.current[stage][level - 1] = levelScore;

      // Print the resulting object
      console.log(stageObjectRef.current);
    }
  };

  // * Storing Level wise Score for barchart

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  let str2 = "";
  const generateQuestion = () => {
    console.log("Generate question excuted for level - ", level);
    if (array.length > 0 && levelScore < 3.3 && stage < 4) {
      randomIndex = Math.floor(Math.random() * array.length);
      console.log(randomIndex);
      const Q_no = array[randomIndex];
      const str = stage
        .toString()
        .concat(
          ".",
          level.toString().concat(".", array[randomIndex].toString())
        );

      setStrDisplay(stage.toString().concat(".", level.toString()));

      console.log(strDisplay);

      Q_arr.push(str);
      console.log("Q_arr", Q_arr);

      console.log("Displaying LevelWise Score - ");
      console.log(stageObjectRef.current);

      const filteredData = data.filter(
        (question) =>
          question.stage === stage &&
          question.level === level &&
          question.Q_no === Q_no
      );
      console.log(filteredData);

      setCurrentQuestion(filteredData[0]);

      //! ---------------- String Requirement for text to speech:  ------------------------------------------------
      if (filteredData[0].sign == "-") {
        str2 = filteredData[0].num1
          .toString()
          .concat(" minus ", filteredData[0].num2.toString().concat(" = to "));
      } else if (filteredData[0].sign == "*") {
        str2 = filteredData[0].num1
          .toString()
          .concat(
            " multiply by ",
            filteredData[0].num2.toString().concat(" = to ")
          );
      } else {
        str2 = filteredData[0].num1
          .toString()
          .concat(
            " ",
            filteredData[0].sign
              .toString()
              .concat(" ", filteredData[0].num2.toString().concat(" = to "))
          );
      }

      // Convert str2 into speech
      let speech = new SpeechSynthesisUtterance(str2);
      window.speechSynthesis.speak(speech);

      // -------------------------------------------------------------------------------------------------------------------

      setAnswer("");

      console.log(array);
    } else if (array.length === 0 && levelScore < 2.5 && stage === 3) {
      support++;
      console.log(
        "Array length == 0 && Stage = 3 && score < 2.5 from question display"
      );
      if (level === 1 && support === 1) {
        console.log("Support = 1 & level = 1");
        support = 0;
        arrayLevel.push(levelScore);

        stageObjectRefFunction(stage, level, levelScore);

        stageScore = levelScore;
        arrayStage.push(stageScore);
        console.log("Stage Array - " + arrayStage);
        console.log(
          "Level Array - " + arrayLevel + "\nStage Score - ",
          stageScore
        );
        console.log("Exhausted Array for Stage 3");
        setExhaust(true);
        handleTestComplete();
      } else if (support === 3) {
        console.log("Support = 3");
        support = 0;
        arrayLevel.push(levelScore);

        stageObjectRefFunction(stage, level, levelScore);

        stageScore = stageScore + levelScore;
        arrayStage.push(stageScore);
        console.log("Stage Array - " + arrayStage);
        console.log(
          "Level Array - " + arrayLevel + "\nStage Score - ",
          stageScore
        );
        console.log("Exhausted Array for Stage 3");
        setExhaust(true);
        handleTestComplete();
      } else if (support < 3 && level > 1) {
        let lastadded = arrayLevel.pop();
        stageScore = stageScore - lastadded;
        stageScore = parseFloat(stageScore.toFixed(2));
        levelScore = 0;
        console.log(
          "Level Array - " + arrayLevel + "\n Stage Score - ",
          stageScore
        );
        handleLevelChange(-1);
      }
    }
  };

  // * ---------- Function to check the answer ----------------------------------------------------------------------
  const checkAnswer = () => {
    const [correctCount, incorrectCount, specialWrongCount] =
      countersRef.current[stage];

    //! Correct Answer
    if (currentQuestion && parseInt(answer) === currentQuestion.ans) {
      if (currentQuestion.response >= seconds) {
        console.log("fast");
        score = fast * ans_r;
        console.log("score - ", score);
      } else {
        console.log("slow");
        score = slow * ans_r;
        console.log("score - ", score);
      }
      levelScore = levelScore + score;
      levelScore = parseFloat(levelScore.toFixed(2));
      console.log("Level Score - ", levelScore);

      R_ans.push(Q_arr[Q_arr.length - 1]);
      console.log("R_ans: ", R_ans);

      console.log("Breaking the R_ans string to different arrays - ");
      const result = R_ans.map((element) => {
        const [stage, level, qno] = element.split(".");
        return { stage, level, qno };
      });

      console.log(result);

      updateCounters(stage, "correct");

      console.log("Counters - ");
      console.log(countersRef.current);
    } else if (
      currentQuestion &&
      (parseInt(answer) === currentQuestion.swa1 ||
        parseInt(answer) === currentQuestion.swa2 ||
        parseInt(answer) === currentQuestion.swa3 ||
        parseInt(answer) === currentQuestion.swa4 ||
        parseInt(answer) === currentQuestion.swa5)
    ) {
      if (parseInt(answer) === currentQuestion.swa1) {
        toast.warning("Special Wrong Answer - Case 1", {
          style: {
            backgroundColor: "red",
          },
        });
        console.log("Special Case 1");
        SpW_ans.push(
          Q_arr[Q_arr.length - 1]
            .concat(" : '", answer.toString())
            .concat("' : Case 1")
        );
      } else if (parseInt(answer) === currentQuestion.swa2) {
        toast.warning("Special Wrong Answer - Case 2", {
          style: {
            backgroundColor: "red",
          },
          autoClose: 200,
        });
        console.log("Special Case 2");
        SpW_ans.push(
          Q_arr[Q_arr.length - 1]
            .concat(" : '", answer.toString())
            .concat("' : Case 2")
        );
      } else if (parseInt(answer) === currentQuestion.swa3) {
        toast.warning("Special Wrong Answer - Case 3", {
          style: {
            backgroundColor: "red",
          },
          autoClose: 200,
        });
        console.log("Special Case 3");
        SpW_ans.push(
          Q_arr[Q_arr.length - 1]
            .concat(" : '", answer.toString())
            .concat("' : Case 3")
        );
      } else if (parseInt(answer) === currentQuestion.swa4) {
        toast.warning("Special Wrong Answer - Case 4", {
          style: {
            backgroundColor: "red",
          },
          autoClose: 200,
        });
        console.log("Special Case 4");
        SpW_ans.push(
          Q_arr[Q_arr.length - 1]
            .concat(" : '", answer.toString())
            .concat("' : Case 4")
        );
      } else if (parseInt(answer) === currentQuestion.swa5) {
        toast.warning("Special Wrong Answer - Case 5", {
          style: {
            backgroundColor: "red",
          },
          autoClose: 200,
        });
        console.log("Special Case 5");
        SpW_ans.push(
          Q_arr[Q_arr.length - 1]
            .concat(" : '", answer.toString())
            .concat("' : Case 5")
        );
      }
      setDec(dec + 2);
      console.log("SpW_ans: ", SpW_ans);

      score = ans_spw;
      console.log("score - ", score);

      levelScore = levelScore + score;
      levelScore = parseFloat(levelScore.toFixed(2));
      console.log("Level Score - ", levelScore);

      updateCounters(stage, "specialWrong");

      console.log("Counters - ");
      console.log(countersRef.current);
    } else {
      toast.warning("Wrong Answer", {
        style: {
          backgroundColor: "red",
        },
        autoClose: 100,
      });
      if (currentQuestion.response >= seconds) {
        console.log("fast");
        score = fast * ans_w;
        console.log("score - ", score);
      } else {
        console.log("slow");
        score = slow * ans_w;
        console.log("score - ", score);
      }
      levelScore = levelScore + score;
      levelScore = parseFloat(levelScore.toFixed(2));
      console.log("Level Score - ", levelScore);

      W_ans.push(Q_arr[Q_arr.length - 1]);
      console.log("W_ans: ", W_ans);

      updateCounters(stage, "incorrect");

      console.log("Counters - ");
      console.log(countersRef.current);
    }
  };

  const arr = [0, 16, 16, 6];

  function setState() {
    if (levelScore >= 3.3 && level + 1 === arr[stage]) {
      // handleStageChange();
      console.log("Exception Case 1");
      arrayLevel.push(levelScore);
      arrayLevel.push(3);

      stageObjectRefFunction(stage, level, levelScore);
      stageObjectRefFunction(stage, level + 1, 3);

      stageScore = stageScore + levelScore;
      stageScore = parseFloat(stageScore.toFixed(2));
      console.log(
        "Level Array - " + arrayLevel + "\n Stage Score - ",
        stageScore
      );
      arrayStage.push(stageScore);
      console.log("Stage Array - " + arrayStage);
      if (stage < 3) {
        handleStageChange();
      } else {
        handleTestComplete();
      }
    } else if (levelScore >= 3.3 && level < arr[stage]) {
      console.log("Best Case - Level change x2");
      arrayLevel.push(levelScore);
      stageObjectRefFunction(stage, level, levelScore);

      arrayLevel.push(3);

      stageObjectRefFunction(stage, level + 1, 3);

      stageScore = stageScore + levelScore + 3;
      stageScore = parseFloat(stageScore.toFixed(2));
      console.log(
        "Level Array - " + arrayLevel + "\n Stage Score - ",
        stageScore
      );

      handleLevelChange(2);
    } else if (levelScore >= 2.5 && level < arr[stage]) {
      console.log("Average Case - Level change x1");
      arrayLevel.push(levelScore);

      stageObjectRefFunction(stage, level, levelScore);

      stageScore = stageScore + levelScore;
      stageScore = parseFloat(stageScore.toFixed(2));
      console.log(
        "Level Array - " + arrayLevel + "\n Stage Score - ",
        stageScore
      );
      handleLevelChange(1);
    } else if (levelScore >= 2.5 && level === arr[stage] && stage < 3) {
      console.log("Average Case - Stage change ");
      arrayLevel.push(levelScore);

      stageObjectRefFunction(stage, level, levelScore);

      stageScore = stageScore + levelScore;
      stageScore = parseFloat(stageScore.toFixed(2));
      console.log(
        "Level Array - " + arrayLevel + "\n Stage Score - ",
        stageScore
      );
      arrayStage.push(stageScore);
      console.log("Stage Array - " + arrayStage);

      handleStageChange();
    } else if (levelScore >= 2.5 && level === arr[stage] && stage === 3) {
      console.log("Average Case - Test Complete");
      arrayLevel.push(levelScore);

      stageObjectRefFunction(stage, level, levelScore);

      stageScore = stageScore + levelScore;
      stageScore = parseFloat(stageScore.toFixed(2));
      console.log(
        "Level Array - " + arrayLevel + "\n Stage Score - ",
        stageScore
      );
      arrayStage.push(stageScore);
      console.log("Stage Array - " + arrayStage);
      levelScore = 0;
      stageScore = 0;
      handleTestComplete();
    }
  }

  const handleLevelChange = (val) => {
    console.log("handle level change executed");

    console.log(
      "Level Array - " + arrayLevel + "\n Stage Score - ",
      stageScore
    );

    level = level + val;
    levelScore = 0;
    console.log("level updated to - ", level);

    for (let i = 0; i < arr_c.length; i++) {
      array[i] = arr_c[i];
    }
  };

  // ! Handle Level Change function and useEffect END

  // ! 1.2 Handle Stage Change useEffect for Unsuccessful condition
  function unsuccess() {
    if (array.length === 0 && levelScore < 2.5 && stage < 3) {
      support++;

      if (level === 1 && support === 1) {
        console.log("Support = 1 & level = 1");
        support = 0;
        arrayLevel.push(`${strDisplay} : ` + levelScore);

        stageObjectRefFunction(stage, level, levelScore);

        stageScore = levelScore;
        arrayStage.push(stageScore);
        console.log("Stage Array - " + arrayStage);
        console.log(
          "Level Array - " + arrayLevel + "\nStage Score - ",
          stageScore
        );
        handleStageChange();
      } else if (support === 3) {
        support = 0;
        console.log("Support = 3");
        arrayLevel.push(`${strDisplay} : ` + levelScore);

        stageObjectRefFunction(stage, level, levelScore);

        stageScore = stageScore + levelScore;
        arrayStage.push(stageScore);
        console.log("Stage Array - " + arrayStage);
        console.log(
          "Level Array - " + arrayLevel + "\nStage Score - ",
          stageScore
        );
        handleStageChange();
      } else if (support < 3 && level > 1) {
        let lastadded = arrayLevel.pop();

        stageScore = stageScore - lastadded;
        stageScore = parseFloat(stageScore.toFixed(2));
        levelScore = 0;
        console.log(
          "Level Array - " + arrayLevel + "\n Stage Score - ",
          stageScore
        );
        handleLevelChange(-1);
      } else if (array.length === 0 && levelScore < 2.5 && stage === 3) {
        support++;
        console.log(
          "Stage = 3 && Level = 1 && score < 2.5 from primary function"
        );
        if (level === 1 && support === 1) {
          console.log("Support = 1 & level = 1");
          support = 0;
          arrayLevel.push(`${strDisplay} : ` + levelScore);

          stageObjectRefFunction(stage, level, levelScore);

          stageScore = levelScore;
          arrayStage.push(stageScore);
          console.log("Stage Array - " + arrayStage);
          console.log(
            "Level Array - " + arrayLevel + "\nStage Score - ",
            stageScore
          );
          console.log("Exhausted Array for Stage 3");
          setExhaust(true);
          handleTestComplete();
        } else if (support === 3) {
          support = 0;
          console.log("Support = 3");
          arrayLevel.push(`${strDisplay} : ` + levelScore);

          stageObjectRefFunction(stage, level, levelScore);

          stageScore = stageScore + levelScore;
          arrayStage.push(stageScore);
          console.log("Stage Array - " + arrayStage);
          console.log(
            "Level Array - " + arrayLevel + "\nStage Score - ",
            stageScore
          );
          console.log("Exhausted Array for Stage 3");
          setExhaust(true);
          handleTestComplete();
        } else if (support < 3 && level > 1) {
          let lastadded = arrayLevel.pop();
          stageScore = stageScore - lastadded;
          stageScore = parseFloat(stageScore.toFixed(2));
          levelScore = 0;
          console.log(
            "Level Array - " + arrayLevel + "\n Stage Score - ",
            stageScore
          );
          handleLevelChange(-1);
        }
      }
    }
  }
  // ! 1.2 Handle Stage Change useEffect for Unsuccessful condition END

  // * Handle Stage Change function
  const handleStageChange = () => {
    console.log("handle stage change executed");
    levelScore = 0;
    stageScore = 0;

    stage++;

    level = 1;

    for (let i = 0; i < arr_c.length; i++) {
      array[i] = arr_c[i];
    }

    //! Display Overlay for Stage 2 & Stage 3 START

    setShowOverlay(true); // Set the state to true to display the overlay

    setTimeout(() => {
      setShowOverlay(false); // Hide the overlay after 5 seconds
    }, 5000);

    //* Display Overlay for Stage 2 & Stage 3 END
  };
  // * Handle Stage Change function END

  // ! Handle Test Complete function

  const handleTestComplete = () => {
    setGameover(true);
    sendUserResult();
  };
  // ! Handle Test Complete function END

  //! This function works on adding autoFocus everytime the page reloads and a new question is generated
  useEffect(() => {
    const inputElement = document.querySelector('input[type="number"]');
    if (inputElement) {
      inputElement.focus();
    }
  }, [levelScore]);

  // UseEffect and Restart fuction for Response time ------------------------------------------------------------------------------------------
  /*
  These functions are coded to track and store time required by an individual for solving a particular question
  */

  var timer;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  // ! Use Effect to handle minimum time utilization while a student gives the test
  useEffect(() => {
    // Function to skip to next stage when student takes more than 5mins to solve a question

    if (seconds === 300 && stage <= 2 && started && !exhaust) {
      console.log("Time is up!");
      handleStageChange();
    }
    // Function to end test when student takes more than 5mins on stage 3 to solve a question
    else if (seconds === 300 && stage === 3 && started && !exhaust) {
      console.log("Time is up!");
      restart();
      W_ans.push(Q_arr[Q_arr.length - 1]);
      console.log("W_ans: ", W_ans);
      setExhaust(true);
      sendUserResult();
    }
  }, [started, seconds]);
  // ! Use Effect to handle minimum time utilization while a student gives the test END

  // ! Stores the time required per question and then restarts the timer for next question
  const restart = () => {
    // let str = minutes.toString().concat(":", seconds.toString());
    Timer.push(seconds);
    // console.log("Timer - "+Timer)
    console.log("Timer : ", Timer);
    setSeconds(0);
    setMinutes(0);
  };
  // ! Stores the time required per question and then restarts the timer for next question END

  // Restart Func and Use Effect End ----------------------------------------------------------------------------------------------------------

  // Function to start the quiz
  const startQuiz = () => {
    setSeconds(0);
    setMinutes(0);
    setStarted(true);
    generateQuestion();

    //! Display Overlay for Stage 1 : Addition START
    setShowOverlay(true); // Set the state to true to display the overlay

    setTimeout(() => {
      setShowOverlay(false); // Hide the overlay after 5 seconds
    }, 5000);
    //* Display Overlay for Stage 1 : Addition END
  };

  // Render start screen if quiz has not started
  if (!started) {
    return (
      <div className="start">
        <div className="start-inner">
          <h1>Welcome to the Quiz!</h1>
          <p>Click the button below to start the quiz.</p>
          <div className="start-btn-class">
            <button className="start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sendUserResult = async (e) => {
    try {
      // For Connection with Local Backend
      const url = "http://localhost:8080/api/usersResult";

      // For Connection with Hosted Backend
      // const url = "https://edsense.onrender.com/api/usersResult";

      const { data: res } = await axios.post(url, {
        email: payload.email,
        Q_arr: Q_arr,
        Timer: Timer,
        R_ans: R_ans,
        SpW_ans: SpW_ans,
        W_ans: W_ans,

        // hint Counter
        hintCounter: hintCounter,
        // Result: Result,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleCombinedClick = () => {
    if (answer) {
      array.splice(randomIndex, 1);
      // Restart fuction added for response time module -------------------------------------------------------------------------
      restart();
      // Reponse time function end -----------------------------------------------------------------------------------------------
      checkAnswer();
      setState();
      unsuccess();
      generateQuestion();
      setError("");
    } else {
      toast.info("Please fill in this field");
      return;
    }
  };

  // Code by Om - 11th July

  //!  This function works on functionality that a student enters his answers and instead of clicking on the next question, he/she can simply click "Enter" and proceed to the next question
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCombinedClick();
    }
  };
  // Code by Om - 11th July
  // !------------------------ Main Display Page ---------------------------------------------------------------------

  return (
    <div className="Test">
      {!exhaust ? (
        <div>
          {!gameover ? (
            <div className="new">
              {currentQuestion ? (
                <div>
                  <div className="errorTextbox">
                    <p className={error ? "errorText" : ""}>{error}</p>
                  </div>
                  <div className="obox">
                    <div className="Mbox"> {currentQuestion.num1}</div>
                    <div className="Sign">{currentQuestion.sign}</div>
                    <div className="Mbox"> {currentQuestion.num2}</div>
                    <div className="equals"> = </div>
                    <input
                      className="mbox2"
                      type="number"
                      onChange={handleInputChange}
                      value={answer}
                      autoFocus
                      onKeyDown={handleKeyDown}
                      required
                    />
                  </div>
                  <button className="button1" onClick={handleCombinedClick}>
                    Next Question
                  </button>
                  <div className="levelDisplay">{strDisplay}</div>
                  <div>
                    <ModalTest stage={stage} />
                  </div>
                  {/* Container to display the embedded video */}
                  <div id="hintContainer"></div>
                </div>
              ) : (
                <div>
                  {/* setResult("Pass") */}
                  <TestCompletePage
                    countRef={countersRef.current}
                    stageRef={stageObjectRef.current}
                    arrayStage={arrayStage}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* setResult("Pass") */}
              <TestCompletePage
                countRef={countersRef.current}
                stageRef={stageObjectRef.current}
                arrayStage={arrayStage}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* setResult("Fail") */}
          <TestCompletePage
            countRef={countersRef.current}
            stageRef={stageObjectRef.current}
            arrayStage={arrayStage}
          />
        </div>
      )}
      {/* Conditionally render the StageOverlay component */}
      {showOverlay && (
        <StageOverlay
          stageText={`Stage ${stage} : ${
            stage === 1
              ? "Addition"
              : stage === 2
              ? "Subtraction"
              : "Multiplication"
          }`}
          duration={3000} // Adjust the duration as needed (in milliseconds)
        />
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Toast Container END */}
    </div>
  );

  // ! ------------------------------------------------------------------------------------------------------------------
};

export default Test;
