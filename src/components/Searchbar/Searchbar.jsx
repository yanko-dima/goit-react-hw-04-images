import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from 'components/Searchbar/Searchbar.module.css';
import 'components/styles.css';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      toast.error('🦄 Enter image name!');
      return;
    }

    onSubmit({ search });
    onFormReset();
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearch(value.toLowerCase());
  };

  const onFormReset = () => {
    setSearch('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchBtn} type="submit">
          <span className={css.searchBtnLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          value={search}
          name="search"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
