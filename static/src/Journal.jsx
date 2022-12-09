import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./Post.jsx"

const Journal = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(props.user.name);
  }, []);

  useEffect(() => {
  	console.log(posts)
  }, [posts])

  const getPosts = () => {
    axios
      .get(`/posts/${props.user.name}`)
      .then((results) => setPosts(results.data));
  };

  return (
    <div id="journal-wrapper">
			{posts.map(p =>
				<Post post={p} key={p.id} />
				)}
    </div>
  );
};

export default Journal;

Journal.defaultProps = {
  user: {
    name: "Sarah",
    email: "sarah@gmail.com",
    password: "Pass",
  },
};