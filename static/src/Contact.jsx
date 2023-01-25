import React, {useState, useRef } from "react";
import {useNavigate} from "react-router-dom";


const Contact = (props) => {
  const [userName, setUserName] = useState(props.user);
  const [userEmail, setUserEmail] = useState(props.email);

  const form = useRef();
  const name = useRef();
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const copy = useRef();

  const navigate = useNavigate();

  const emailCheck = /^[a-zA-Z][\w\.+\-\']+@[\w.]+\.\w{2,4}/;

  const sendMsg = (e) => {
    e.preventDefault();

    if (!emailCheck.test(email.current.value)) {
      return props.showAlert("please enter a valid email");
    }

    const msg = {
      name: name.current.value,
      email: email.current.value,
      subject: subject.current.value,
      body: body.current.value,
      copy: copy.current.checked
    };

    props.submitContactForm(msg);
    form.current.reset();
  };

  return (
    <main id="contact-main" className="container p-4 my-3 my-md-5 border rounded">
      <h2 id="contact-title" className="text-center mb-3">contact us</h2>
      <form action="#" id="contact-form" className="form-group p-4" ref={form} onSubmit={sendMsg}>
        <input
          type="text"
          name="name"
          required
          defaultValue={userName}
          placeholder="name"
          ref={name}
          className="form-control form-input"
        />
        <input
          type="email"
          name="email"
          required
          defaultValue={userEmail}
          placeholder="email"
          ref={email}
          className="form-control form-input my-3"
        />
        <input
          type="text"
          name="subject"
          required
          placeholder="subject"
          ref={subject}
          className="form-control form-input"
        />
        <textarea
          name=""
          id="contact-subject"
          cols="40"
          rows="4"
          required
          placeholder="message"
          ref={body}
          className="form-control my-3"
        ></textarea>
        <div id ="contact-check-group" className="form-check form-input">
        <input type="checkbox" name="send-copy" id="contact-check" className="form-check-input" ref={copy}/>
        <label htmlFor="send-copy" className="form-label">send me a copy</label>
        </div>
        <div className="form-btn-div">
          <button type="button" id="contact-cancel" className="form-btn btn border px-4 px-lg-5" onClick={() => navigate("/")}>
              cancel
            </button>
          <input type="submit" value="send" className="form-btn btn border px-4 px-lg-5"/>
        </div>
      </form>
    </main>
  );
};

export default Contact;
