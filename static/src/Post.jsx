import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";


const Post = (props) => {
  const [entry, setEntry] = useState(props.post.entry);
  const [fullEntry, setFullEntry] = useState(props.post.entry);
  const [entryArr, setEntryArr] = useState([]);
  const [edited, setEdited] = useState(false);

  const postText = useRef();
  const done = useRef();

  const date = DateTime.fromISO(props.post.date).toLocaleString("ff");

  useEffect(() => {
    if (entry.length > 254) {
      shortenEntry();
    }
  }, [])

  useEffect(() => {
    setEntryArr(entry.split('\n\n'));

    if (edited) {
      shortenEntry();
      setEdited(false);
    }
  }, [entry])


  const shortenEntry = () => {
    if (entry.length > 250) {
      setEntry(fullEntry.slice(0, 250) + "...");
    }
  }

  const expandEntry = (e) => {
    if (entry.length < 254) {
      setEntry(fullEntry);
    } else if (entry.length >= 254 && !postText.current.isContentEditable){
      setEntry(fullEntry.slice(0, 250) + "...")
    }
  };

  const editPost = (e) => {
    postText.current.contentEditable = true;
    expandEntry();
    done.current.classList.remove("hide")
  }

  const saveEdit = () => {
    props.updateEntry(props.post.id, postText.current.innerText);
    setFullEntry(postText.current.innerText);
    setEntry(postText.current.innerText);
    setEdited(true);
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
