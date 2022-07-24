import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import { fetchImages } from 'servises/pixabay-api';
import Button from 'components/Button';

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

    if (prevSearchKey !== nextSearchKey) {
      this.setState({ status: 'pending', page: 1 });

      fetchImages(nextSearchKey, page, per_page)
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
        <>
          <ul className={css.imageGallery}>
            {images.hits.map(({ id, webformatURL, largeImageURL }) => (
              <li className={css.imageGalleryItem} key={id}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  searchKey={searchKey}
                />
              </li>
            ))}
          </ul>
          {images.hits.length >= 12 && <Button />}
        </>
      );
    }
  }
}

export default ImageGallery;
