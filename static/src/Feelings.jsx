import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

const Feelings = (props) => {
	const [baseEmotions, setBaseEmotions] = useState([]);
	const [secondEmotions, setSecondEmotions] = useState([]);
	const [thirdEmotions, setThirdEmotions] = useState([]);
	const [baseChoice, setBaseChoice] = useState();
	const [secondChoice, setSecondChoice] = useState();
	const [thirdChoice, setThirdChoice] = useState();

	const second = useRef();
	const third = useRef();


	useEffect(() => {
		getBaseEmotions();
	}, [])

	useEffect(() => {
		getSecondEmotions();
		props.feeling(baseChoice);
	}, [baseChoice])

	useEffect(() => {
		getThirdEmotions();
		props.feeling(secondChoice);
	}, [secondChoice])

	useEffect(() => {
		getThirdEmotions();
		props.feeling(thirdChoice);
	}, [thirdChoice])

  const getBaseEmotions = () => {
		axios.get('/base_emotions')
			.then(results => setBaseEmotions(results.data))
	}

	const getBaseChoice = (e) => {
		setBaseChoice(e.target.value);
		second.current.classList.remove('hide');
	}

	const getSecondEmotions = () => {
		axios.get(`/second_emotions/${baseChoice}`)
			.then(results => setSecondEmotions(results.data))
	}

	const getSecondChoice = (e) => {
		setSecondChoice(e.target.value);
		third.current.classList.remove('hide');
	}

	const getThirdEmotions = () => {
		axios.get(`/third_emotions/${secondChoice}`)
			.then(results => setThirdEmotions(results.data))
	}

	const getThirdChoice = (e) => {
		setThirdChoice(e.target.value)
		props.hide();
		props.show();
	}

  return (
		<div>
			<form action="#">
				<label htmlFor="base"><h2>What is your main vibe right now?</h2></label>
				<select name="base" id="base" onChange={(e) => getBaseChoice(e)}>
					<option  value="default"></option>
					{baseEmotions.map(e =>
							<option key={e.id} value={e.name}>{e.name}</option>
						)}
				</select>
				<div ref={second} className="hide">
					<label htmlFor="second" >
						<h2>Because I am feeling:</h2>
					</label>
					<select name="second" id="second" onChange={(e) => getSecondChoice(e)}>
						<option  value="default"></option>
						{secondEmotions.map(e =>
								<option key={e.id} value={e.name}>{e.name}</option>
							)}
					</select>
				</div>
				<div ref={third} className="hide">
					<label htmlFor="third"><h2>And a little...</h2></label>
					<select name="third" id="third" onChange={(e) => getThirdChoice(e)}>
						<option  value="default"></option>
						{thirdEmotions.map(e =>
								<option key={e.id} value={e.name}>{e.name}</option>
							)}
					</select>
				</div>
			</form>
		</div>
	)
};

export default Feelings