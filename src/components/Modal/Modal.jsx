import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    const { onClose } = this.props;

    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('Нужно закрыть модалку');
        onClose();
      }
    });
  }

  render() {
    const { largeImageURL, searchKey } = this.props;

    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={searchKey} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
