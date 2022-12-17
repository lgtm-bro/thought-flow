import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Post = (props) => {
  const [post, setPost] = useState(props.post.entry);
  const date = DateTime.fromISO(props.post.date).toLocaleString("ff");
  let entryArr = post.split('\n\n');

  useEffect(() => {
    entryArr = post.split('\n\n')
  }, [post])

  useEffect(() => {
    if (post.length > 250) {
      setPost(entry);
    }
  }, [])


  let entry = props.post.entry.length > 250 ?
                props.post.entry.slice(0, 250) + "..." :
                props.post.entry;

  const expandEntry = () => {
    if (post.length < 254) {
      setPost(props.post.entry);
    } else {
      setPost(entry);
    }
    console.log(post)
  };


  return (
    <div className="post-wrapper" onClick={expandEntry}>
      <span className="post-date">{date}</span>
      {entryArr.map((p, i) =>
        <p key={i}>{p}</p>
      )}
    </div>
  );
};

export default Post;
