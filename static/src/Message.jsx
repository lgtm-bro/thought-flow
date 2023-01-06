import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

const Message = ({ msg, hasQuestion, linkText, path }) => {
	// const [hasQuestion, setHasQuestion] = useState(false);


	return (
		<div id="user-msg-container">
			<span>{msg}</span>
			{hasQuestion &&
				<Link to={path}>{linkText}</Link>
			}
		</div>
	)
}

Message.defaultProps = {
	hasQuestion: false,
	linkText: 'Yes!',
	path: '/'
}

export default Message;