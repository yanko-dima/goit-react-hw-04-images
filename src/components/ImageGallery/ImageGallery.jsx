import { Component } from 'react';
import { toast } from 'react-toastify';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import { fetchImages } from 'servises/pixabay-api';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { page, per_page } = this.props;
    const prevSearchKey = prevProps.searchKey;
    const nextSearchKey = this.props.searchKey;
    const prevPage = prevProps.per_page;
    const nextPage = this.props.per_page;

    if (prevSearchKey !== nextSearchKey || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetchImages(nextSearchKey, page, per_page)
        .then(images => {
          this.setState({ images: images.hits, status: 'resolved' });

          if (images.hits.length === 0) {
            toast.error('I`m dont found images');
            // alert('I`m dont found images');
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    const { images, status } = this.state;
    const { searchKey, onLoadMore } = this.props;

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
                />
              </li>
            ))}
          </ul>
          {images.length >= 12 && <Button onLoadMore={onLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
