import PropTypes from 'prop-types';
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

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onOpenModal: PropTypes.func.isRequired,
  onLargeImageAlt: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
