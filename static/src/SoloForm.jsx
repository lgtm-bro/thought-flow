import React, { Fragment, useState, useEffect, useRef } from "react";

const SoloForm = (props) => {
  return (
    <Fragment>
			<br />
      <label htmlFor="solo_text">
			<span className="prompt">Tell us about it...</span>
				<br/>
        <input type="textbox" id="solo_text" />
      </label>
			<br /><br />
    </Fragment>
  );
};

export default SoloForm;
