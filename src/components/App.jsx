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
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (!searchKey) {
      return;
    }

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
            // if ()
            return;
          }
        }

        setGallery(prev => [...prev, ...result.hits]);
        console.log(result.hits.length);
        setLoading(false);
      })
      .catch(error => console.log(error.message));
  }, [searchKey, page]);

  const formSubmitHandler = ({ search }) => {
    setSearchKey(search);
    setPage(1);
  };

  const openModal = image => {
    setShowModal(true);
    setLargeImage(image.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hangleLargeImageAlt = image => {
    setLargeImageAlt(image.tags);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  console.log(gallery[gallery.length - 1]);
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
