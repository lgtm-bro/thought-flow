import React, {useState, useRef, Fragment} from "react";
import { BiShow } from "react-icons/bi";


const Profile = (props) => {
	const [name, setName] = useState(props.user);
	const [email, setEmail] = useState(props.email);

	const password = useRef();
	const newPassword = useRef();
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

	const checkPasswords = () => {
		return password.current.value = passwordConfirm.current.value;
	}

	const validateEmail = (e) => {
		const emailCheck = /^[a-zA-Z]\w+@\w+\.\w{2,4}/;
		return emailCheck.test(e);
	}

	const submitChanges = (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			alert("Please enter a valid email");
		} else if (!checkPasswords) {
			alert("The new passwords don't match");
		} else {
			if (newPassword.current) {
				props.updateProfile(name, email, password.current.value, newPassword.current.value);
			} else {
				props.updateProfile(name, email, password.current.value, null);
			}
			form.current.reset();
		}
	}

  return (
    <Fragment>
      <h2>Edit Profile</h2>
      <form id="profile-form" ref={form} onSubmit={submitChanges}>
        <label htmlFor="profile-name">Name</label>
        <br />
        <input
					type="text"
					defaultValue={props.user}
					required
					onChange={(e) => setName(e.target.value)}
				/>
        <br /><br />
        <label htmlFor="profile-email">Email</label>
        <br />
				<input
					type="text"
					id="profile-email"
					defaultValue={props.email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
        <br /><br />
				<label htmlFor="profile-password">Current Password</label>
        <br />
        <input
					type="password"
					id="profile-password"
					ref={password}
					required
				/>
				<span className="eye" onClick={() => showPassword(password)}>
					<BiShow />
				</span>
        <br /><br />
        <label htmlFor="profile-new-password">New Password</label>
        <br />
        <input
					type="password"
					id="profile-new-password"
					ref={newPassword}
					placeholder="optional"
				/>
				<span className="eye" onClick={() => showPassword(newPassword)}>
					<BiShow />
				</span>
        <br /><br />
        <label htmlFor="profile-confirm-password">Confirm New Password</label>
        <br />
        <input
					type="password"
					id="profile-confirm-password"
					ref={passwordConfirm}
				/>
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
