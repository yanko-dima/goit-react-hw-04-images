import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: null,
    page: 1,
    per_page: 12,
    status: 'idle',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { page, per_page } = this.state;
    const prevSearchKey = prevProps.searchKey;
    const nextSearchKey = this.props.searchKey;
    // console.log('prevSearchKey: ', prevSearchKey);
    // console.log('nextSearchKey: ', nextSearchKey);

    if (prevSearchKey !== nextSearchKey) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${nextSearchKey}&page=${page}&key=27888292-ee7badc36537d4c81fc58ae14&image_type=photo&orientation=horizontal&per_page=${per_page}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`No images with ${nextSearchKey} name`)
          );
        })
        .then(images => {
          this.setState({ images, status: 'resolved' });
        })
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    const { images, status } = this.state;
    const searchKey = this.props.searchKey;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className={css.imageGallery}>
          {images &&
            images.hits.map(({ id, webformatURL, largeImageURL }) => (
              <li className={css.imageGalleryItem} key={id}>
                <ImageGalleryItem
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  searchKey={searchKey}
                />
              </li>
            ))}
        </ul>
      );
    }
  }
}

export default ImageGallery;
