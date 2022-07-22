const ImageGalleryItem = ({ webformatURL, largeImageURL, imgName }) => (
  <img src={webformatURL} alt={imgName} />
);

export default ImageGalleryItem;
