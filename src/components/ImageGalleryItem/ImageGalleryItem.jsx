import css from './ImageGalleryItem.module.css';
// import Modal from 'components/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, searchKey }) => (
  <>
    <img
      className={css.imageGalleryItemImage}
      src={webformatURL}
      alt={searchKey}
    />
    {/* <Modal largeImageURL={largeImageURL} searchKey={searchKey} /> */}
  </>
);

export default ImageGalleryItem;
