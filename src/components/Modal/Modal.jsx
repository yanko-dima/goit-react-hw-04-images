import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ largeImage, alt, onClose }) {
  const modalRoot = useRef(document.querySelector('#modal-root'));

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBeckdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBeckdropClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>,
    modalRoot.current
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
