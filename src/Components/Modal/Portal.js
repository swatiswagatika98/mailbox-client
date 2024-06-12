import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Portal.css';
import Modal from './Modal';

export default function Portal() {
  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal-content'>
        <Modal />
      </div>
    </div>,
    document.getElementById("modal")
  );
}