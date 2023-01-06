import React, {useState, useEffect, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmModal = ({ sendFeeling }) => {
	const msg = useRef();

	const navigate = useNavigate();

	const getConfirm = (e) => {
		let answer = e.target.value;
		if (answer === "yes") {
			sessionStorage.removeItem("baseEmotionId");
			sessionStorage.removeItem("secondEmotionId");
			sessionStorage.removeItem("thirdEmotionId");
			sessionStorage.removeItem("feeling");
			sendFeeling(null);
		}

		e.target.checked = false;
		msg.current.classList.add("hide");
		navigate('/');
	}

    return (
        <div id="confirm-wrapper" className="hide" ref={msg}>
					<h4>Do you want to change your current emotion?</h4>
					<form action="#">
						<input type="radio" name="confirm" value="yes" onChange={getConfirm}/>
						<label htmlFor="">Yes</label>
						<input type="radio" name="confirm" value="no" onChange={getConfirm}/>
						<label htmlFor="">No</label>
					</form>
        </div>
    )

}

export default ConfirmModal;