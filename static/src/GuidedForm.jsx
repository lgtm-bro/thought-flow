import React, { Fragment, useState, useEffect, useRef } from "react";

const GuidedForm = (props) => {
  const embracing = useRef();
  const resisting = useRef();
  const [prompt1, setPrompt1] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [prompt3, setPrompt3] = useState('');
	const [isEmbracing, setIsEmbracing] = useState();
	const [showPrompt2, setShowPrompt2] = useState(false);

	useEffect(() => {
		if (isEmbracing !== undefined) setShowPrompt2(true)
	}, [isEmbracing])

	const getEmbracing = () => {
		setIsEmbracing(embracing.current.checked)
	}

  const getPrompt = (e, func) => {
    func(e.target.value)
    console.log(prompt1)
  }

  const prompt1Key = props.feeling.score > 0 ? "helped" : "caused";
  const prompt2_question = isEmbracing ?
	"How do you think embracing these feelings is impacting this experience for you?":
		"What would it feel like to embrace them?";

  return (
    <Fragment>
			<br />
      <label htmlFor="prompt1">
        What experience or event {prompt1Key} you to feel {props.feeling.name}?
        <br />
        <input type="textbox"
               id="prompt1"
               onChange={(e) => getPrompt(e, setPrompt1)}
        />
      </label>
			<br /><br />
      <label htmlFor="posture">
				<span className="prompt">Are you embracing or resisting these feelings?</span>
      </label>
			<br />
      <input
        type="radio"
        name="posture"
        value="embracing"
        id="embracing"
        ref={embracing}
        onChange={getEmbracing}
      />
      <label htmlFor="embracing">Embracing</label>
      <input
        type="radio"
        name="posture"
        value="resisting"
        id="resisting"
        ref={resisting}
        onChange={getEmbracing}
      />
      <label htmlFor="resisting">Resisting</label>
			<br /><br />
      {showPrompt2 && <div id="guided-form-part2">
				<label htmlFor="prompt2">
				<span className="prompt">{prompt2_question}</span>
				<br />
					<input type="textbox" id="prompt2" />
				</label>
				<br /><br />
				<label htmlFor="prompt3">
					<span className="prompt">What other insights or emotions would you like to share about this experience?</span>
					<br />
					<input type="textbox" id="prompt3" />
				</label>
			</div>}
			<br /><br />
    </Fragment>
  );
};

GuidedForm.defaultProps = {
  feeling: { name: "creative", score: 6 },
};

export default GuidedForm;
