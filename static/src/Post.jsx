import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import ConfirmDelete from "./ConfirmDelete.jsx";

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
  }, []);

  useEffect(() => {
    setEntryArr(entry.split("\n\n"));

    if (edited) {
      shortenEntry();
      setEdited(false);
    }
  }, [entry]);

  const shortenEntry = () => {
    if (entry.length > 250) {
      setEntry(fullEntry.slice(0, 250) + "...");
    }
  };

  const expandEntry = (e) => {
    if (entry.length < 254) {
      setEntry(fullEntry);
    } else if (entry.length >= 254 && !postText.current.isContentEditable) {
      setEntry(fullEntry.slice(0, 250) + "...");
    }
  };

  const editPost = (e) => {
    if (postText.current.isContentEditable){
      postText.current.contentEditable = false;
      done.current.classList.add("hide");
    } else {
      postText.current.contentEditable = true;
      expandEntry();
      done.current.classList.remove("hide");
    }
  };

  const saveEdit = () => {
    props.updateEntry(props.post.id, postText.current.innerText);
    setFullEntry(postText.current.innerText);
    setEntry(postText.current.innerText);
    setEdited(true);
    postText.current.contentEditable = false;
    done.current.classList.add("hide");
  };

  const showConfirmDelete = () => {
    document.getElementById(`post-delete-container-${props.post.id}`).classList.remove('hide');
  };

  return (
    <div className="post-wrapper card my-3">
      <div className="card-body">
      <ConfirmDelete
        delete={props.deletePost}
        entryId={props.post.id}
        type="post"
        page="/"
      />
        <div className="row justify-content-between">
          <h5 className="post-date card-title col">{date}</h5>
          <h6 className="icon-container card-subtitle col-2 col-md-3 col-lg-2 pe-3 pe-md-1">
            <span className="edit-icon icon card-link" onClick={editPost}>
              <AiOutlineEdit className="icon" />
            </span>
            <span className="delete-icon icon card-link">
              <AiOutlineClose
                className="icon"
                onClick={showConfirmDelete}
              />
            </span>
          </h6>
        </div>
        <div>
          <div
            id={`post-${props.post.id}`}
            className="card-text p-2"
            contentEditable="false"
            ref={postText}
            onClick={expandEntry}
            suppressContentEditableWarning={true}
          >
            {entryArr.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <button
            value="Done"
            ref={done}
            className="hide btn form-btn"
            onClick={saveEdit}
          >
            done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
