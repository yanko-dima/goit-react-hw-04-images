const ImageGalleryItem = ({ webformatURL, largeImageURL, searchKey }) => (
  <img src={webformatURL} alt={searchKey} />
);

export default ImageGalleryItem;
