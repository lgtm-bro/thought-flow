import React, {Fragment} from "react";

const Greet = (props) => {
	const feeling = props.feeling;

	return (
		<Fragment>
			{props.user && <span className="greet-span" >Hi {props.user}. </span>}
			{feeling && <span className="greet-span" >Today's vibe is {feeling.charAt(0).toUpperCase() + feeling.substring(1)}</span>}
		</Fragment>
	)
}

export default Greet;
