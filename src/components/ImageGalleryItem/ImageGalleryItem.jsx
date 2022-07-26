import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  searchKey,
  toggleModal,
  showModal,
}) => {
  return (
    <>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={searchKey}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          searchKey={searchKey}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
