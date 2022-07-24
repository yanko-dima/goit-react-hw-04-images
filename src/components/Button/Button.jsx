import css from './Button.module.css';

const Button = () => (
  <div className={css.ButtonWraper}>
    <button className={css.Button} type="button">
      Load more
    </button>
  </div>
);

export default Button;
