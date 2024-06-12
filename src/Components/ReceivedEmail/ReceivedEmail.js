import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ReceivedEmail.css';
import { SetReadMail, deleteMail, setReadMail, setUserClickMail } from '../Redux/Slices/StoreEmail';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md'; 

export default function ReceivedEmail() {

  const recievedEmail = useSelector(state => state.StoreEmail.recievedEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFirst10Words = (text) => {
    const words = text.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    } else {
      return text;
    }
  };

  const readMailHandler = (id) => {
    recievedEmail.map((mail) => {
      if (mail.id === id) {
        const updatedMail = {
          ...mail,
          ReadEmails: true,
        };

        // Dispatch the updated mail object
        dispatch(SetReadMail(updatedMail));
        dispatch(setUserClickMail(updatedMail));
        navigate("/reademail")
      }
    })
  }

  const deleteHandler = (id) => {
    recievedEmail.map((mail) => {
      if (mail.id === id) {
        dispatch(deleteMail(mail))
       
      }
    })
  
  }

  return (
    <div className='send_mail_main_div'>
      {recievedEmail.length > 0 ? 
      recievedEmail.map((email) => (
        <div key={email.id} className='main__div'>
          <div className='send_mail_container' onClick={() => readMailHandler(email.id)}>
            {email.ReadEmails === false ? <span className="dot"></span> : null}
            <span>{email.from}</span>
            <div className="div_span">
              <span>{getFirst10Words(email.emailBody)}</span>
            </div>
          </div> 
          <div className="delete_button_container">
            <button className='button' onClick={() => deleteHandler(email.id)}>
              <MdDelete />
            </button>
          </div>
          <br />
        </div>
      )): <h2>No Mails</h2>
      }
    </div>
  )
}
