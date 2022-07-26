import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onOpenModal, onLargeImageAlt }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
        loading="lazy"
        onClick={() => {
          onOpenModal(item);
          onLargeImageAlt(item);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
