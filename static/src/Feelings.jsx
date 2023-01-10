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

  const base = useRef();
  const second = useRef();
  const third = useRef();
  const cancel = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
    getBaseEmotions();
  }, []);

  useEffect(() => {
    getSecondEmotions();

    if (baseChoice === 'default') {
      second.current.classList.add("hide");
      third.current.classList.add("hide");
      cancel.current.classList.add("hide");
    }
  }, [baseChoice]);

  useEffect(() => {
    getThirdEmotions();
  }, [secondChoice]);

  useEffect(() => {
    getThirdEmotions();
    if (thirdChoice) {
      props.feeling(thirdChoice);
      // props.sendToEntry ? navigate("/entry") : navigate("/");
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
    <div id="feeling-container">
      <form action="#">
        <label htmlFor="base">
          <h2>What is your main vibe right now?</h2>
        </label>
        <select
          name="base"
          id="base"
          ref={base}
          onChange={(e) => getBaseChoice(e)}
        >
          <option value="default"></option>
          {baseEmotions.map((e) => (
            <option key={e.id} value={e.name} id={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <div ref={second} id="second-container" className="hide">
          <label htmlFor="second">
            <h2>Because I am feeling:</h2>
          </label>
          <select
            name="second"
            id="second"
            onChange={(e) => getSecondChoice(e)}
          >
            <option value="default"></option>
            {secondEmotions.map((e) => (
              <option key={e.id} value={e.name} id={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div ref={third} id="third-container" className="hide">
          <label htmlFor="third">
            <h2>And a little...</h2>
          </label>
          <select name="third" id="third" onChange={(e) => getThirdChoice(e)}>
            <option value="default"></option>
            {thirdEmotions.map((e) => (
              <option key={e.id} value={e.name} id={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        <span id="feeling-cancel" className="hide" ref={cancel}>
          <Link to="/">
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Feelings;
