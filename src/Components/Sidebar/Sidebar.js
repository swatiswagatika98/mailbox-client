import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPortal } from '../Redux/Slices/StoreEmail';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';

export default function Sidebar() {
  const portal = useSelector(state => state.StoreEmail.portal);
  const recievedEmail = useSelector(state => state.StoreEmail.recievedEmail);

  const [unread, setUnread] = useState(0);
  const user = auth.currentUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the unread count using reduce method
    const newUnread = recievedEmail.reduce((count, mail) => {
      return mail.ReadEmails === false ? count + 1 : count;
    }, 0);

    setUnread(newUnread);
  }, [recievedEmail]);  

  const modalHandler = () => {
    dispatch(setPortal());
  };

  const emailShowHandler = () => {
    navigate("/receivedemails");
  };

  const sendmailHandler = () => {
    navigate("/emailbody");
  };

  return (
    <>
      <div className="main_container">
        <button className='compose-btn' onClick={modalHandler}>
          <Link to={"/emailcompose"} style={{ textDecoration: 'none', color: 'inherit' }}>
            Compose Email
          </Link>
        </button>
        <div className='mail-inbox' style={{ cursor: "pointer" }} onClick={emailShowHandler}>
          <span className='inbox' >Inbox {unread}</span>
        </div>
        <div className='mail-inbox' style={{ cursor: "pointer" }} onClick={sendmailHandler}>
          <span className='inbox' >Send Mail</span>
        </div>
       
      </div>
    </>
  );
}
