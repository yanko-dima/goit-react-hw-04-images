import { Component } from 'react';

class Searchbar extends Component {
  state = {};
  render() {
    return (
      <section>
        <form action="submit">
          <label>
            <button type="submit">Search</button>
            <input type="text" />
          </label>
        </form>
      </section>
    );
  }
}

export default Searchbar;
