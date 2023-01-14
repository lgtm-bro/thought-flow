import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Post from "./Post.jsx";

const Journal = ({
  posts,
  feeling,
  changeMsg,
  deletePost,
  updateEntry,
  setSendToEntry,
}) => {
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  let entryLink = feeling ? "/entry" : "/";

  useEffect(() => {
    feeling
      ? null
      : setMsg("First, let's indentify how you feel about this experience");
  }, [feeling]);

  const sendFeelingMsg = () => {
    if (!feeling) {
      changeMsg(msg, false);
      setSendToEntry(true);
    } else {
      changeMsg("", false);
    }
  };

  return (
    <div id="journal-container rounded border">
      <div id="add-entry" className="custom-link">
       <Link to={entryLink}>
        <button
          type="button"
          id="add-entry"
          className="custom-link btn hub-btn flex-end"
          onClick={sendFeelingMsg}
        >
          <span className="badge hub-icon">
              <AiOutlinePlus />
          </span>
          <span id="add-entry-btn">entry</span>
        </button>
        </Link>
      </div>
      <div id="journal-wrapper" className="p-2 px-3 mt-3 rounded">
        {!!sessionStorage.getItem("userId") && (
          <div>
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
        )}
        {!sessionStorage.getItem("userId") && (
          <h5 className="text-center">please login to view your journal</h5>
        )}
      </div>
    </div>
  );
};

export default Journal;
