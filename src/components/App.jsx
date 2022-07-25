import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchKey: '',
    page: 1,
  };

  formSubmitHandler = ({ search }) => {
    this.setState({ searchKey: search });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { searchKey, page } = this.state;

    return (
      <>
        <Searchbar
          onSubmit={this.formSubmitHandler}
          resetPage={this.resetPage}
          page={page}
        />
        <ImageGallery
          onLoadMore={this.onLoadMore}
          searchKey={searchKey}
          page={page}
        />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
