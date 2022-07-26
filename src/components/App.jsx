import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import { fetchImages } from 'servises/pixabay-api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Home from 'components/Home';

export class App extends Component {
  static propTypes = {
    state: PropTypes.arrayOf(
      PropTypes.exact({
        searchKey: PropTypes.string,
        gallery: PropTypes.array,
        page: PropTypes.number.isRequired,
        showModal: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        largeImage: PropTypes.string,
        largeImageAlt: PropTypes.string,
      })
    ),
  };

  state = {
    searchKey: '',
    gallery: [],
    page: 1,
    showModal: false,
    status: 'idle',
    largeImage: '',
    largeImageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchKey = prevState.searchKey;
    const nextSearchKey = this.state.searchKey;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchKey !== nextSearchKey || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetchImages(nextSearchKey, nextPage)
        .then(result => {
          if (nextPage === 1) {
            if (result.hits.length === 0) {
              toast.info('🦄 No images for your request');
              this.onStatusIdle();
            } else {
              toast.success(`🦄 I'm found ${result.total} images`);
              this.setState({ gallery: result.hits, status: 'resolved' });
            }
          }
        })
        .catch(error => this.setState({ error }));
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: 'pending' });
      fetchImages(nextSearchKey, nextPage)
        .then(result => {
          this.setState({
            gallery: [...prevState.gallery, ...result.hits],
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  formSubmitHandler = ({ search }) => {
    this.setState({ searchKey: search, page: 1 });
  };

  onLoadMore = () => {
    this.setState({ status: 'pending' });
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = image => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ largeImage: image.largeImageURL });
  };

  onStatusIdle = () => {
    this.setState({ status: 'idle' });
  };

  hangleLargeImageAlt = image => {
    this.setState({ largeImageAlt: image.tags });
  };

  render() {
    const {
      formSubmitHandler,
      onLoadMore,
      closeModal,
      openModal,
      hangleLargeImageAlt,
    } = this;
    const { gallery, showModal, status, largeImage, largeImageAlt } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        {status === 'idle' && <Home />}
        {status === 'resolved' && (
          <ImageGallery
            gallery={gallery}
            onOpenModal={openModal}
            onLargeImageAlt={hangleLargeImageAlt}
          />
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && gallery.length >= 12 && (
          <Button onLoadMore={onLoadMore} />
        )}
        {showModal && largeImage && (
          <Modal
            largeImage={largeImage}
            alt={largeImageAlt}
            onClose={closeModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
