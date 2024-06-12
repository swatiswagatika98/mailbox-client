import React, { useState } from "react";
import JoditEditor from "jodit-react";
import "./TextEditor.css";
import { useDispatch, useSelector } from "react-redux";
import { SetEmail, SetEmailData, addEmail } from "../Redux/Slices/StoreEmail";
import { auth } from "../../Firebase";

export default function App() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const ReadEmails = useSelector(state => state.StoreEmail.readMail);
  const user = auth.currentUser;


  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleSendEmail =  () => {
    const id = Math.random();
    const from = user.email;
    const emailObj ={
      to,
      subject,
      emailBody,
      id,
      ReadEmails,
      from
    }   
   
    dispatch(SetEmail(emailObj))
  };

  return (
    <div className="email-compose">

      <div className="input_span">
        <span className="input_start">To</span>
        <input type="text" className="input_text" onChange={(e) => { setTo(e.target.value); }} value={to} />
        <span className="input_end">Cc Bcc</span>
      </div>

      <div className="input_span">
        <input type="text" placeholder="Subject" className="input_text" onChange={(e) => { setSubject(e.target.value) }} value={subject} />
      </div>

      <div className="input_span_body">
        <textarea type="text" placeholder="Write your email" className="input_text textarea" onChange={(e) => { setEmailBody(e.target.value) }} value={emailBody} />
      </div>

        <JoditEditor value={content} tabIndex={1} onChange={newContent => setContent(newContent)} className="texteditor"/>

      <button className="send-button" onClick={handleSendEmail}> Send </button>

    </div>
  );
}
