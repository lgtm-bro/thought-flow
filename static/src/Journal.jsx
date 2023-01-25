import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import Post from "./Post.jsx";

const Journal = ({
  posts,
  feeling,
  changeMsg,
  deletePost,
  updateEntry,
  setSendToEntry,
  setCurrPost,
}) => {
  const [msg, setMsg] = useState(null);

  let entryLink = feeling ? "/entry" : "/";

  useEffect(() => {
    feeling
      ? null
      : setMsg("First, let's indentify how you feel about this experience");
  }, [feeling]);

  const sendFeelingMsg = () => {
    if (!feeling) {
      changeMsg(msg, false, "feelings-form");
      setSendToEntry(true);
    } else {
      changeMsg("");
    }
  };

  return (
    <div id="journal-container" className="px-2 rounded-bottom">
      {!!sessionStorage.getItem("userId") && (
        <div className="add-entry mt-4 border-bottom border-1">
          <Link to={entryLink}>
            <button
              type="button"
              id="add-entry-btn"
              className="custom-link hub-btn py-1 px-5"
              onClick={sendFeelingMsg}
            >
              <span className=" hub-icon">
                <FaPlus />
              </span>
              <span className="add-btn">entry</span>
            </button>
          </Link>
        </div>
      )}
      <div id="journal-wrapper" className="px-3 rounded">
        {!!sessionStorage.getItem("userId") && (
          <div id="entries-list">
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
          <h5 className="text-center py-2">
            please login to view your journal
          </h5>
        )}
      </div>
    </div>
  );
};

export default Journal;
