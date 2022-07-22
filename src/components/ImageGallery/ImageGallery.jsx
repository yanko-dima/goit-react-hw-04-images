import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    per_page: 12,
  };

  componentDidMount() {
    const { page, per_page } = this.state;
    const searchKey = this.props.searchKey;
    // const KEY = 27888292 - ee7badc36537d4c81fc58ae14;

    fetch(
      `https://pixabay.com/api/?q=${searchKey}&page=${page}&key=27888292-ee7badc36537d4c81fc58ae14&image_type=photo&orientation=horizontal&per_page=${per_page}`
    )
      .then(res => res.json())
      .then(images => {
        this.setState({ images });
      });
  }

  render() {
    const { images } = this.state;
    const imgName = this.props.imgName;

    return (
      <ul className={css.imageGallery}>
        {images &&
          images.hits.map(({ id, webformatURL, largeImageURL }) => (
            <li className={css.imageGalleryItem} key={id}>
              <ImageGalleryItem
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                imgName={imgName}
              />
            </li>
          ))}
      </ul>
    );
  }
}

export default ImageGallery;
