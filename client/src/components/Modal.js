import React, { useContext } from 'react';
import ModalContext from '../context/ModalContext';

const Modal = ({ open, children }) => {
  
  const { setOpenModal } = useContext(ModalContext);

  const closeModal = () => {
    setOpenModal(false)
  }
  
  if(!open) return;

  return (
    <>
      <div onClick={closeModal} className='overlay'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='modalContainer'
        >
          <div className='modalContent'>
            <p className='closeBtn' onClick={closeModal}>
              X
            </p>
              {children}
          </div>
          </div>
      </div>
    </>
  );
};

export default Modal;