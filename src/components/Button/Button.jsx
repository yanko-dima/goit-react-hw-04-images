import css from './Button.module.css';

const Button = ({ onLoadMore }) => (
  <div className={css.ButtonWraper}>
    <button className={css.Button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  </div>
);

export default Button;
