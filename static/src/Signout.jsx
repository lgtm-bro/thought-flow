import React from "react";

const Signout = (props) => {
  const signoutUser = () => {
    props.clear();
    props.cancelForm();
  };

  return (
    <div id="signout-container" className="container bg-light border shadow rounded text-center p-2">
    <form id="signout-form" className="form-group bg-light">
      <h3>sign out?</h3>
      <div className="form-btn-div">
        <button type="button" className="form-btn btn border" onClick={props.cancelForm} value="Cancel">
          Cancel
        </button>
        <button type="button" value="Sign Out" className="form-btn btn border" onClick={signoutUser}>
          Sign Out
        </button>
      </div>
    </form>
    </div>
  );
};

export default Signout;
