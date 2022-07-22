import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Loader from 'components/Loader';
// import Button from 'components/Button';
// import Modal from 'components/Modal';

export class App extends Component {
  state = {
    images: null,
    searchKey: '',
    loading: false,
    error: null,
    status: 'idle',
  };

  componentDidMount() {
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevImg = prevState.img;
    const nextImg = this.state.img;

    if (nextImg !== prevImg) {
      this.setState({ status: 'pending' });
      console.log('status: pending');
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
        {/* {loading && <div></div>} */}
        {/* <Button /> */}
        {/* <Modal /> */}
        {/* <ToastContainer /> */}
      </>
    );
  }
}
