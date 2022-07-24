import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, searchKey } = this.props;

    return (
      <>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={searchKey}
          onClick={this.toggleModal}
        />

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            searchKey={searchKey}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
