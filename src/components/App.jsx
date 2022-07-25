import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchKey: '',
    page: 1,
    per_page: 12,
  };

  formSubmitHandler = ({ search }) => {
    this.setState({ searchKey: search });
  };

  resetPage = () => {
    this.setState({ page: 1, per_page: 12 });
  };

  onLoadMore = () => {
    this.setState(({ per_page }) => ({ per_page: per_page + 12 }));
  };

  render() {
    const { searchKey, page, per_page } = this.state;

    return (
      <>
        <Searchbar
          onSubmit={this.formSubmitHandler}
          resetPage={this.resetPage}
        />
        <ImageGallery
          onLoadMore={this.onLoadMore}
          searchKey={searchKey}
          per_page={per_page}
          page={page}
        />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
