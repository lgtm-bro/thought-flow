import React, {useState, useEffect} from "react";
// import { Link, useNavigate } from "react-router-dom";

const Quote = (props) => {
  const [quote, setQuote] = useState({"text": "", "author": ""});
	const feeling = 'inspirational';

	useEffect(() => {
		props.getQuote()
		.then(res => setQuote(res.data))
		.catch(err => {console.log('ERROR:', err.response.data.msg)});
	}, [])


	return (
    <div id="quote-wrapper" className="bg-light shadow mt-5 mx-5 p-4">
      <h5>{quote.text}</h5>
			<h6>{quote.author}</h6>
    </div>
  );
};

export default Quote;
