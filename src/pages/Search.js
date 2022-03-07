import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>SEARCH</h1>
      </div>
    );
  }
}

export default Search;