import React from "react";

const Profile = (props) => {
  return (
    <div>
      <h2>Edit Profile</h2>
      <form>
        <label htmlFor="profile-name">Name</label>
        <br />
        <input type="text" placeholder={props.user} />
        <br />
        <label htmlFor="profile-email">Email</label>
        <br />
        <input type="text" placeholder={props.email} />
        <br />
        <label htmlFor="profile-password">Password</label>
        <br />
        <input type="password" />
        <br />
        <label htmlFor="profile-confirm-password">Confirm Password</label>
        <br />
        <input type="password" />
        <br />
        <br />
				<button onClick={props.hide}>Cancel</button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Profile;
