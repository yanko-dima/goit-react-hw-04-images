import { Component } from 'react';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';

export class App extends Component {
  state = {
    img: null,
    error: null,
    status: 'idle',
  };

  // componentDidMount() {

  // }

  componentDidUpdate(prevProps, prevState) {
    const prevImg = prevState.img;
    const nextImg = this.state.img;

    if (nextImg !== prevImg) {
      this.setState({ status: 'pending' });
    }
  }

  render() {
    // const { img } = this.state;
    return (
      <>
        <Searchbar />
        <ImageGallery />
        <Loader />
        <Button />
        <Modal />
      </>
    );
  }
}
