import React from 'react'
import SendEmail from '../SendEmail/SendEmail'
import TextEditor from '../TextEditor/TextEditor'
import './Modal.css'
import { MdOutlineOpenInFull } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPortal } from '../Redux/Slices/StoreEmail';


export default function Modal() {
  const navigate = useNavigate();
  const portal = useSelector(state => state.StoreEmail.portal);
  const dispatch = useDispatch();

  const fullscreenHandler = ()=>(
      navigate("/email")
  )
  const modalCloseHandler = () => {
    console.log(portal);
    dispatch(setPortal());
    navigate("/receivedemails")
  };
  return (
    <>
      <div className='heading-email'>
        <span >New Message</span>
        <div style={{cursor:"pointer"}}>
          <MdOutlineOpenInFull  onClick={fullscreenHandler}/> 
          <GrClose onClick={modalCloseHandler}/>
        </div>
      </div>
      <TextEditor/>
    </>
  )
}
