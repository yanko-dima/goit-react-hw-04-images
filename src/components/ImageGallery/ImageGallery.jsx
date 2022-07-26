import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

const ImageGallery = ({
  status,
  searchKey,
  onLoadMore,
  toggleModal,
  showModal,
  images,
}) => {
  if (status === 'idle') {
    return (
      <div className={css.idleWraper}>
        <h1 className={css.idleTitle}>Image search service</h1>
        <p className={css.idleText}>Enter image name</p>
      </div>
    );
  }
  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <li className={css.imageGalleryItem} key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                searchKey={searchKey}
                toggleModal={toggleModal}
                showModal={showModal}
              />
            </li>
          ))}
        </ul>
        {images.length >= 12 && <Button onLoadMore={onLoadMore} />}
      </>
    );
  }
};

export default ImageGallery;
