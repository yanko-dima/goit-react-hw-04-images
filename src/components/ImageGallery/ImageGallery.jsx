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

export default ImageGallery;
