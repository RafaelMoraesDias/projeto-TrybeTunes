import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
    };
  }

  validateButton2 = ({ target }) => {
    const nummax = 2;
    this.setState({
      disable: target.value.length < nummax,
    });
  };

  render() {
    const { disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>

          <input
            type="text"
            data-testid="search-artist-input"
            name="name"
            onChange={ this.validateButton2 }
          />
          {' '}
          NOME

          <button
            name="username"
            type="submit"
            disabled={ disable }
            data-testid="search-artist-button"
          >
            ENTRAR

          </button>

        </form>
      </div>
    );
  }
}

export default Search;
