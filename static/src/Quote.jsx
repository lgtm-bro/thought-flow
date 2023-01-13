import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

const Quote = (props) => {
  const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
  const feeling = "inspirational";

  useEffect(() => {
    props
      .getQuote()
      .then((res) => {
				setQuote(res.data.text);
				setAuthor(res.data.author || "Unknown");
			})
      .catch((err) => {
        console.log("ERROR:", err.response.data.msg);
      });
  }, []);

  return (
    <div
      id="quote-wrapper"
      className="p-4 my-4 mx-auto shadow-sm rounded flex-column justify-content-center"
    >
      <h5 className="blockquote">{quote}</h5>
      <h6 className="blockquote-footer my-5">{author}</h6>
    </div>
  );
};

export default Quote;
