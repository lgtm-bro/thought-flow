import React, {useState, useEffect} from "react";
// import { Link, useNavigate } from "react-router-dom";

const Quote = (props) => {
  const [quote, setQuote] = useState({body: '', author: ''});
	const feeling = 'inspirational';

	useEffect(() => {
		props.getQuote(feeling)
		.then(res => {
			console.log('quote', res.body)
			setQuote(res)
		})
		.catch(err => console.log(err))

	}, [])


	return (
    <div id="quote-wrapper">
      <h5>{quote.body}</h5>
			<h6>{quote.author}</h6>
		<br /><br />
		{/* <a href="#">Add an entry</a>
        <a href="#">Add a milestone</a> */}
    </div>
  );
};

export default Quote;
