import React, { Fragment, useState, useEffect, useRef } from "react";

const SoloForm = (props) => {
  return (
    <Fragment>
      <label htmlFor="solo_text">
        <input type="textbox" id="solo_text" />
      </label>
    </Fragment>
  );
};

export default SoloForm;
