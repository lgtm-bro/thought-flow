import React from "react";

const Signout = (props) => {
  const signoutUser = () => {
    props.clear();
    props.cancelForm();
  };

  return (
    <div
      id="signout-container"
      className="container border shadow rounded text-center"
    >
      <form id="signout-form" className="form-group p-5">
        <h3>do you want to sign out?</h3>
        <div id="signout-btn-div" className="form-btn-div">
          <button
            type="button"
            className="form-btn btn border px-5"
            onClick={props.cancelForm}
            value="Cancel"
          >
            cancel
          </button>
          <button
            type="button"
            value="Sign Out"
            className="form-btn btn border px-5"
            onClick={signoutUser}
          >
            sign out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signout;
