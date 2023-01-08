import React, { useRef, useEffect } from "react";

const userName = sessionStorage.getItem("user") || "Name";
const userEmail = sessionStorage.getItem("email") || "Email address";

const Contact = (props) => {
  const form = useRef();
  const name = useRef();
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const copy = useRef();


  const sendMsg = (e) => {
    e.preventDefault();
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
    <main>
      <h3>contact us</h3>
      <form action="#" ref={form} onSubmit={sendMsg}>
        <input
          type="text"
          name="name"
          // required
          defaultValue={userName}
          ref={name}
        />
        <br />
        <br />
        <input
          type="text"
          name="email"
          // required
          defaultValue={userEmail}
          ref={email}
        />
        <br />
        <br />
        <input
          type="text"
          name="subject"
          required
          placeholder="Subject"
          ref={subject}
        />
        <br />
        <br />
        <textarea
          name=""
          id="contact-subject"
          cols="30"
          rows="10"
          required
          placeholder="Message"
          ref={body}
        ></textarea>
        <br />
        <br />
        <input type="checkbox" name="send-copy" ref={copy}/>
        <label htmlFor="send-copy">Send me a copy</label>
        <br />
        <br />
        <input type="submit" value="send" />
      </form>
    </main>
  );
};

export default Contact;
