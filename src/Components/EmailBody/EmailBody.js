import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EmailBody.css';
import { MdDelete } from 'react-icons/md'; 
import { SetReadMail, deleteMail, deleteSendMail, setUserClickMail } from '../Redux/Slices/StoreEmail';
import { useNavigate } from 'react-router-dom';


export default function EmailBody() {
  const SendMails = useSelector(state => state.StoreEmail.sendEmail);
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
    SendMails.map((mail) => {
      if (mail.id === id) {
        const updatedMail = {
          ...mail,
          ReadEmails: true,
        };

        // Dispatch the updated mail object
        dispatch(SetReadMail(updatedMail));
        navigate("/reademail")
      }
    })
  }

  
  const deleteHandler = (id) => {
    SendMails.map((mail) => {
      if (mail.id === id) {
        dispatch(deleteSendMail(mail))
      }
    })
  
  }

  return (
    <div className='send_mail_main_div'>

      { SendMails.length >0 ?
      SendMails.map((email) => (
        <div key={email.id} className='main__div' >
          <div className='send_mail_container' onClick={() => readMailHandler(email.id)} >
            <span>{email.to}</span>
            <div className="div_span">
              <span>{getFirst10Words(email.emailBody)}</span>
            </div>
          </div> 
          <div className="delete_button_container" >
            <button className='button' onClick={() => deleteHandler(email.id)}>
              <MdDelete />
            </button>
          </div>
          <br />
        </div>
      )) : <h2>No Mails</h2>
    }
    </div>
  );
}
