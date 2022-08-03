import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import { fetchImages } from 'servises/pixabay-api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Home from 'components/Home';

export const App = () => {
  const [searchKey, setSearchKey] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

  useEffect(() => {
    setLoading(true);

    fetchImages(searchKey, page)
      .then(result => {
        if (page === 1) {
          if (result.hits.length === 0) {
            toast.info('🦄 No images for your request');
            setStatus('idle');
            setLoading(false);
            return;
          } else {
            toast.success(`🦄 I'm found ${result.total} images`);
            setGallery(result.hits);
            setStatus('resolved');
            setLoading(false);
            return;
          }
        }

        setGallery([...gallery, ...result.hits]);
        setStatus('resolved');
        setLoading(false);
      })
      .catch(error => console.log(error.message));
  }, [searchKey, page, gallery]);

  const formSubmitHandler = ({ search }) => {
    setSearchKey(search);
    setPage(1);
  };

  // const onStatusIdle = () => {
  //   setStatus('idle');
  // };

  const openModal = image => {
    setShowModal(true);
    setLargeImage(image.largeImageURL);
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
    // this.setState({ largeImage: image.largeImageURL });
  };

  const closeModal = () => {
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
    setShowModal(false);
  };

  const hangleLargeImageAlt = image => {
    // this.setState({ largeImageAlt: image.tags });
    setLargeImageAlt(image.tags);
  };

  const onLoadMore = () => {
    // this.setState(({ page }) => ({ page: page + 1 }));
    setPage(page => page + 1);
  };

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
      {loading && <Loader />}
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
};
