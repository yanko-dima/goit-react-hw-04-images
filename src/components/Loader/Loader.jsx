import { Puff } from 'react-loader-spinner';
import css from './Loader.module.css';
// import css from './ImageGalleryItem.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Puff
        height="80"
        width="80"
        radisu={1}
        color="#3f51b5"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
