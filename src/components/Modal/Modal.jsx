import css from './Modal.module.css';

const Modal = ({ largeImageURL, searchKey }) => {
  return (
    <div class={css.Overlay}>
      <div class={css.Modal}>
        <img src={largeImageURL} alt={searchKey} />
      </div>
    </div>
  );
};

export default Modal;
