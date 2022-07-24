import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нужно закрыть модалку');
      this.props.onClose();
    }
  };

  handleBeckdropClick = e => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, searchKey } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBeckdropClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={searchKey} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
