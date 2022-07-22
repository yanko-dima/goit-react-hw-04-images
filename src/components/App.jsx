import { Component } from 'react';
import './styles.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Loader from 'components/Loader';
// import Button from 'components/Button';
// import Modal from 'components/Modal';

export class App extends Component {
  state = {
    images: null,
    imgName: null,
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
      console.log('status: pending');
    }
  }

  formSubmitHandler = ({ search }) => {
    // const { imgName } = this.state;

    this.setState({ imgName: search });
  };

  render() {
    const { imgName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery imgName={imgName} />
        {/* <Loader /> */}
        {/* <Button /> */}
        {/* <Modal /> */}
      </>
    );
  }
}
