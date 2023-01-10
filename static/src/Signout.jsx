import React from "react";

const Signout = (props) => {

  const signoutUser = () => {
    props.clear();
    props.cancelForm();
  };

  return (
    <form id="signout-form" className="bg-light">
      <h3>Are you sure you want to sign out?</h3>
      <button type="button" onClick={props.cancelForm} value="Cancel">
				Cancel
			</button>
      <button type="button" value="Sign Out" onClick={signoutUser}>
				Sign Out
			</button>
    </form>
  );
};

export default Signout;
