import React from "react";

const name = sessionStorage.getItem("user") || "Name";
const email = sessionStorage.getItem("email") || "Email address";

const Contact = (props) => {

	const sendMsg = (e) => {
		e.preventDefault();
		props.submitContactForm();
	}

  return (
    <main>
			<h3>Contact us</h3>
      <form action="#" onSubmit={sendMsg}>
        <input type="text" name="name" placeholder={name}/>
				<br /><br />
        <input type="text" name="email" placeholder={email}/>
				<br /><br />
        <input type="text" name="subject"placeholder="Subject"/>
				<br /><br />
        <textarea name="" id="contact-subject" cols="30" rows="10" placeholder="Message"></textarea>
        <br /><br />
				<input type="checkbox" name="send-copy"/>
				<label htmlFor="send-copy">Send me a copy</label>
				<br /><br />
        <input type="submit" value="SEND" />
      </form>
    </main>
  );
};

export default Contact;
