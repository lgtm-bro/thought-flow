import React, { Fragment, useState, useEffect, useRef } from "react";

const GuidedForm = (props) => {
  return (
    <Fragment>
      <label htmlFor="prompt1">
        <input type="text" id="prompt1" />
      </label>
      <input type="textbox" id="prompt1-response" />
      <label htmlFor="prompt2">
        <input type="text" id="prompt2" />
      </label>
      <input type="textbox" id="prompt2-response" />
      <label htmlFor="prompt3">
        <input type="text" id="prompt3" />
      </label>
      <input type="textbox" id="prompt3-response" />
    </Fragment>
  );
};

export default GuidedForm;
