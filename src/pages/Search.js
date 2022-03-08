import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Card from '../components/Card';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      disabled: true,
      loading: false,
      data: [],
      artist: '',
      hasSearched: false,
    };
  }

  handleValidade = (event) => {
    const { value } = event.target;
    const MIN_CHAR_ALLOWED = 2;
    if (value.length >= MIN_CHAR_ALLOWED) this.setState({ disabled: false });
    this.setState({ searchField: value });
  };

  searchAlbums = () => {
    const { searchField } = this.state;
    // Limpar campo
    this.setState({ searchField: '' });
    // Pesquisar album
    // Mostrar carregando enquanto pesquisa
    this.setState({ loading: true }, async () => {
      const result = await searchAlbumsAPIs(searchField);
      this.setState({
        loading: false, data: result, artist: searchField, hasSearched: true });
    });
  }

  showArtist = (artist) => (
    <span>
      Resultado de álbuns de:
      {' '}
      {artist}
    </span>
  );

  render() {
    const { searchField, disabled, loading, data, artist, hasSearched } = this.state;
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
              onClick={ this.searchAlbums }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <div className="test">
          {
            artist !== '' ? this.showArtist(artist) : ''
          }
        </div>
        <div>
          {loading && <Loading />}
          {
            (data.length === 0) && hasSearched
              ? <span>Nenhum álbum foi encontrado</span>
              : data.map((item, index) => <Card { ...item } key={ index } />)
          }
          {/* {
            loading && (data.length === 0)
              ? <Loading />
              : data.map((item, index) => <Card { ...item } key={ index } />)
          } */}
        </div>
      </>
    );
  }
}

export default Search;
