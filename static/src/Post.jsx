import React from "react";

const Post = (props) => (
  <div className="post-wrapper">
    <div className="post-title">{props.post.title}</div>
    <div className="post-date">{props.post.date}</div>
    <div className="post-entry">{props.post.entry}</div>
  </div>
);

export default Post;
