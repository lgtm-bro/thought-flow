import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Post from "./Post.jsx";

const Journal = ({posts, feeling, deletePost, updateEntry}) => {

  const navigate = useNavigate();


  return (
    <div id="journal-container">
      {feeling && <h5> Add a new entry
        <span><Link to="/entry"><AiOutlinePlus/></Link></span>
      </h5>}
      {posts.map((p) => (
        <Post
          post={p}
          key={p.id}
          id={p.id}
          deletePost={deletePost}
          updateEntry={updateEntry}
        />
      ))}
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
