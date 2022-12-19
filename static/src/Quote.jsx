import React, {useState, useEffect} from "react";

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
    <div>
      <h5>{quote.body}</h5>
			<h6>{quote.author}</h6>
    </div>
  );
};

export default Quote;
