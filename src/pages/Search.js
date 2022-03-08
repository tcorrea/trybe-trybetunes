import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      disabled: true,
    };
  }

  handleValidade = (event) => {
    const { value } = event.target;
    const MIN_CHAR_ALLOWED = 2;
    if (value.length >= MIN_CHAR_ALLOWED) this.setState({ disabled: false });
    this.setState({ searchField: value });
  };

  render() {
    const { searchField, disabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleValidade }
              value={ searchField }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
