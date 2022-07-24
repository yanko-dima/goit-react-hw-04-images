import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchKey: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchKey = prevState.searchKey;
    const nextSearchKey = this.state.searchKey;

    if (nextSearchKey !== prevSearchKey) {
      console.log('Пришел запрос');
    }
  }

  formSubmitHandler = ({ search }) => {
    // const { loading } = this.state;

    this.setState({ searchKey: search });
  };

  render() {
    const { searchKey } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery searchKey={searchKey} />
        {/* <ToastContainer /> */}
      </>
    );
  }
}
