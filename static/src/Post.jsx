import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Post = (props) => {
  const [post, setPost] = useState(props.post.entry);
  const date = DateTime.fromISO(props.post.date).toLocaleString("ff");

  useEffect(() => {
    if (post.length > 250) {
      setPost(entry);
    }
  }, []);

  const entry = post.length > 250 ? post.slice(0, 250) + "..." : post;

  const expandEntry = () => {
    if (post === entry) {
      setPost(props.post.entry);
    } else {
      setPost(entry);
    }
  };

  return (
    <div className="post-wrapper" onClick={expandEntry}>
      <span className="post-date">{date}</span>
      <p className="post-entry">{post}</p>
    </div>
  );
};

export default Post;
