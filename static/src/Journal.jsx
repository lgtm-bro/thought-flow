import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, Outlet, useOutletContext } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Post from "./Post.jsx";

const Journal = ({posts, feeling, changeMsg, deletePost, updateEntry}) => {
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  let entryLink = feeling ? "/entry" : "/";

  useEffect(() => {
    feeling ? null :
    setMsg("First, let's indentify how you feel about this experience");
    }, [])

    const sendFeelingMsg = () => {
      if (!feeling) changeMsg(msg, false)
    }


  return (
    <div id="journal-container">
      {!!sessionStorage.getItem('user') && <h5>
        <span id="add-entry" onClick={sendFeelingMsg}>
          <Link to={entryLink}><AiOutlinePlus/>add an entry</Link>
        </span>
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
