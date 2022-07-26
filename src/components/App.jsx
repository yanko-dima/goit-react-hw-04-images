import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import { fetchImages } from 'servises/pixabay-api';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchKey: '',
    images: [],
    page: 1,
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevSearchKey = prevState.searchKey;
    const nextSearchKey = this.state.searchKey;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchKey !== nextSearchKey || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetchImages(nextSearchKey, page)
        .then(images => {
          this.setState({ images: images.hits, status: 'resolved' });

          if (images.hits.length === 0) {
            toast.error('🦄 I`m dont found images');
            this.onStatusIdle();
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  formSubmitHandler = ({ search }) => {
    this.setState({ searchKey: search });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onStatusIdle = () => {
    this.setState({ status: 'idle' });
  };

  render() {
    const { searchKey, images, page, showModal, status } = this.state;

    return (
      <>
        <Searchbar
          onSubmit={this.formSubmitHandler}
          resetPage={this.resetPage}
        />
        <ImageGallery
          onLoadMore={this.onLoadMore}
          searchKey={searchKey}
          images={images}
          page={page}
          toggleModal={this.toggleModal}
          showModal={showModal}
          status={status}
        />
        <ToastContainer autoClose={4000} />
      </>
    );
  }
}
