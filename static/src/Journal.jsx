import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

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
      <div className="add-entry mt-4">
       <Link to={entryLink}>
        <button
          type="button"
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
      <div id="journal-wrapper" className="px-3 rounded">
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
