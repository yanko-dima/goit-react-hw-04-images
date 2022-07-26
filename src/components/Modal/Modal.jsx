import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBeckdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, alt } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBeckdropClick}>
        <div className={css.Modal}>
          <img src={largeImage} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {};

export default Modal;
