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
    <div id="journal-wrapper" className="p-4 pt-5">
      {!!sessionStorage.getItem("userId") && (
        <div>
          <h5>
            <span
              id="add-entry"
              className="custom-link"
              onClick={sendFeelingMsg}
            >
              <Link to={entryLink}>
                <AiOutlinePlus />
                add an entry
              </Link>
            </span>
          </h5>
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
  );
};

export default Journal;
