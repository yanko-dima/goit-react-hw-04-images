import PropTypes from 'prop-types';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ gallery, onOpenModal, onLargeImageAlt }) => {
  return (
    <>
      <ul className={css.imageGallery}>
        {gallery.map(items => (
          <ImageGalleryItem
            key={items.id}
            item={items}
            onOpenModal={onOpenModal}
            onLargeImageAlt={onLargeImageAlt}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onLargeImageAlt: PropTypes.func.isRequired,
};

export default ImageGallery;
