import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

//need to handle case when page reloads with edited entry
const Post = (props) => {
  const [post, setPost] = useState(props.post.entry);
  const date = DateTime.fromISO(props.post.date).toLocaleString("ff");

  const postText = useRef();
  const postContainer = useRef();
  const done = useRef();
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

  const expandEntry = (e) => {
    if (post.length < 254) {
      setPost(props.post.entry);
    } else if (!postText.current.isContentEditable) {
      setPost(entry);
    }
  };

  const editPost = (e) => {
    postText.current.contentEditable = true;
    expandEntry();
    done.current.classList.remove("hide")
  }

  const saveEdit = () => {
    console.log(postText.current.value)
    props.updateEntry(props.post.id, postText.current.innerText);
    setPost(props.post.entry);
    postText.current.contentEditable = false;
    done.current.classList.add("hide");
  }


  return (
    <div className="post-wrapper" >
      <span className="post-date">{date}</span>
      <span className="icon-container">
        <span className="delete-icon icon"><IoRemoveOutline className="icon" onClick={() => props.deletePost(props.post.id)}/></span>
        <span className="edit-icon icon" onClick={editPost}><IoPencil className="icon"/></span>
      </span>
      <div
        ref={postContainer}
      >
        <div
          id={`post-${props.post.id}`}
          contentEditable="false"
          ref={postText}
          onClick={expandEntry}
          suppressContentEditableWarning={true}
        >
          {entryArr.map((p, i) =>
            <p key={i}>{p}</p>
          )}
        </div>
        <button
          value="Done"
          ref={done}
          className="hide"
          onClick={saveEdit}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Post;
