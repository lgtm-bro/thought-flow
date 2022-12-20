import React, {useRef, Fragment} from "react";
import { BiShow } from "react-icons/bi";


const Profile = (props) => {
	const password = useRef();
	const passwordConfirm = useRef();
	const form = useRef();


	const showPassword = (fieldRef) => {
		if (fieldRef.current.type === 'password') {
			fieldRef.current.type = 'text';
		} else {
			fieldRef.current.type = 'password';
		}
	}

	const cancelForm = () => {
		form.current.reset();
		props.hide();
	}

  return (
    <Fragment>
      <h2>Edit Profile</h2>
      <form id="profile-form" ref={form}>
        <label htmlFor="profile-name">Name</label>
        <br />
        <input type="text" placeholder={props.user} />
        <br /><br />
        <label htmlFor="profile-email">Email</label>
        <br />
        <input type="text" placeholder={props.email} />
        <br /><br />
        <label htmlFor="profile-password">Password</label>
        <br />
        <input type="password" ref={password} />
				<span className="eye" onClick={() => showPassword(password)}>
					<BiShow />
				</span>
        <br /><br />
        <label htmlFor="profile-confirm-password">Confirm Password</label>
        <br />
        <input type="password" ref={passwordConfirm} />
				<span className="eye" onClick={() => showPassword(passwordConfirm)}>
					<BiShow />
				</span>
        <br />
        <br />
				<div id="profile-btns">
					<button onClick={cancelForm}>Cancel</button>
					<input type="submit" value="Update Info" />
				</div>
      </form>
    </Fragment>
  );
};

export default Profile;
