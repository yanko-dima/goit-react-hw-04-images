import PropTypes from 'prop-types';
import css from './Button.module.css';

// const onBtnClick = ({ onLoadMore }) => {
// e.preventDefault();
// const { onLoadMore } = props;
//   console.log(onLoadMore);
// };

const Button = ({ onLoadMore }) => (
  <div className={css.ButtonWraper}>
    <button className={css.Button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
