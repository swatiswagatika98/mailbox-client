import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import './EmailComposer.css';
import { GrClose } from 'react-icons/gr';
import {  useSelector } from 'react-redux';
import { setPortal } from '../Redux/Slices/StoreEmail';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function EmailComposer() {
  const portal = useSelector(state => state.StoreEmail.portal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CloseHandler = () => {
    console.log(portal); 
    dispatch(setPortal());
    navigate("/receivedemails")
  };

  return (
    <div className="text-editor-container">
      <div className='heading-emails'>
        <span>New Message</span>
        <div>
          <GrClose style={{ cursor: "pointer" }} onClick={CloseHandler} />
        </div>
      </div>
      <TextEditor />
    </div>
  );
}
