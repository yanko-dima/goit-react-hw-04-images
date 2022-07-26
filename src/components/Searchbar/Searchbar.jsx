import { Component } from 'react';
import { toast } from 'react-toastify';
import css from 'components/Searchbar/Searchbar.module.css';
import 'components/styles.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    if (this.state.search.trim() === '') {
      toast.error('🦄 Enter image name!');
      return;
    }

    onSubmit(this.state);
    this.onFormReset();
  };

  onFormReset = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;

    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.searchBtn} type="submit">
            <span className={css.searchBtnLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            value={search}
            name="search"
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
