import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Feelings = (props) => {
  const [baseEmotions, setBaseEmotions] = useState([]);
  const [secondEmotions, setSecondEmotions] = useState([]);
  const [thirdEmotions, setThirdEmotions] = useState([]);
  const [baseChoice, setBaseChoice] = useState();
  const [secondChoice, setSecondChoice] = useState();
  const [thirdChoice, setThirdChoice] = useState();

  const container = useRef();
  const base = useRef();
  const second = useRef();
  const third = useRef();
  const cancel = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    getBaseEmotions();
  }, []);

  useEffect(() => {
    getSecondEmotions();
    !!baseChoice
      ? (container.current.style.height = "80%")
      : (container.current.style.height = "50%");

    if (baseChoice === "default") {
      second.current.classList.add("hide");
      third.current.classList.add("hide");
      cancel.current.classList.add("hide");
      container.current.style.height = "50%";
    }
  }, [baseChoice]);

  useEffect(() => {
    getThirdEmotions();
  }, [secondChoice]);

  useEffect(() => {
    getThirdEmotions();
    if (thirdChoice) {
      props.feeling(thirdChoice);
    }
  }, [thirdChoice]);

  const getBaseEmotions = () => {
    axios
      .get("/base_emotions")
      .then((results) => setBaseEmotions(results.data));
  };

  const getBaseChoice = (e) => {
    if (!props.user) {
      base.current.selectedIndex = 0;
      alert(`Please Log In to create an entry`);
    } else {
      sessionStorage.setItem(
        "baseEmotionId",
        e.target.options[e.target.selectedIndex].id
      );
      sessionStorage.setItem(
        "baseEmotion",
        e.target.options[e.target.selectedIndex].value
      );
      setBaseChoice(e.target.value);
    }
    second.current.classList.remove("hide");
    cancel.current.classList.remove("hide");
  };

  const getSecondEmotions = () => {
    axios
      .get(`/second_emotions/${baseChoice}`)
      .then((results) => setSecondEmotions(results.data));
  };

  const getSecondChoice = (e) => {
    sessionStorage.setItem(
      "secondEmotionId",
      e.target.options[e.target.selectedIndex].id
    );
    setSecondChoice(e.target.value);
    if (e.target.value === "default") {
      third.current.classList.add("hide");
    } else {
      third.current.classList.remove("hide");
    }
  };

  const getThirdEmotions = () => {
    axios
      .get(`/third_emotions/${secondChoice}`)
      .then((results) => setThirdEmotions(results.data));
  };

  const getThirdChoice = (e) => {
    sessionStorage.setItem(
      "thirdEmotionId",
      e.target.options[e.target.selectedIndex].id
    );
    sessionStorage.setItem("feeling", e.target.value);
    setThirdChoice(e.target.value);
    base.current.selectedIndex = 0;
    second.current.classList.add("hide");
    third.current.classList.add("hide");
  };

  const resetForm = () => {
    setBaseChoice("default");
    base.current.selectedIndex = 0;
    sessionStorage.removeItem("baseEmotionId");
    sessionStorage.removeItem("secondEmotionId");
  };

  return (
    <div
      id="feelings-wrapper"
      className="container-fluid "
      ref={container}
    >
      <form action="#" id="feelings-form" className="form rounded mt-2 mt-md-1 pt-2 shadow-sm">
        <h5>my main vibe is:</h5>
        <div className="feel-select">
        <select
          name="base"
          id="base"
          className="feelings-select form-select"
          ref={base}
          onChange={(e) => getBaseChoice(e)}
        >
          <option id="base-default" value="default" className="feeling-option"></option>
          {baseEmotions.map((e) => (
            <option key={e.id} value={e.name} id={e.id} className={`feeling-option ${e.name}`}>
              {e.name}
            </option>
          ))}
        </select>
        </div>
        <div ref={second} id="second-container" className="hide">
          <h5>because I am feeling:</h5>
          <span className="feel-select">
          <select
            name="second"
            id="second"
            className="feelings-select form-select"
            onChange={(e) => getSecondChoice(e)}
          >
            <option value="default" className="feeling-option"></option>
            {secondEmotions.map((e) => (
              <option key={e.id} value={e.name} id={e.id} className="feeling-option">
                {e.name}
              </option>
            ))}
          </select>
          </span>
        </div>
        <div ref={third} id="third-container" className="hide">
          <h5>and a little...</h5>
          <span className="feel-select">
          <select name="third" id="third" className="feelings-select form-select" onChange={(e) => getThirdChoice(e)}>
            <option value="default" className="feeling-option"></option>
            {thirdEmotions.map((e) => (
              <option key={e.id} value={e.name} id={e.id} className="feeling-option">
                {e.name}
              </option>
            ))}
          </select>
          </span>
        </div>
        <div id="feeling-cancel" className="hide" ref={cancel}>
          <Link to="/">
            <button type="button" className="btn form-btn mx-auto my-4" onClick={resetForm}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Feelings;
