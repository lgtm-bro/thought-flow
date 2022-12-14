import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./Post.jsx"

const Journal = (props) => {

  return (
    <div id="journal-container">
			{props.posts.map(p =>
				<Post post={p} key={p.id} />
				)}
    </div>
  );
};

export default Journal;

// Journal.defaultProps = {
//   user: {
//     name: "Sarah",
//     email: "sarah@gmail.com",
//     password: "Pass",
//   },
// };