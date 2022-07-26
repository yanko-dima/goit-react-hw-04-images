import css from 'components/Home/Home.module.css';

const Home = () => {
  return (
    <div className={css.idleWraper}>
      <h1 className={css.idleTitle}>Image search service</h1>
      <p className={css.idleText}>Enter image name</p>
    </div>
  );
};

export default Home;
