import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      artistData: {},
      favoriteSongs: [],
      // loading: false,
    };
  }

  componentDidMount() {
    this.handleGetMusic();
    // this.handleFavoriteSong();
  }

  handleGetMusic = async () => {
    const { match } = this.props;
    const result = await getMusics(match.params.id);
    const resultFav = await getFavoriteSongs();
    const [artistData, ...rest] = result;
    resultFav.map((item) => removeSong(item));

    this.setState({ data: rest, artistData, favoriteSongs: resultFav });
  };

  // handleFavoriteSong = async () => {
  //   const result = await getFavoriteSongs();
  //   // remove todas as musicas favoritas
  //   result.map((item) => removeSong(item));
  //   this.setState({ favoriteSongs: [...result] });
  // }

  render() {
    const { data, artistData, favoriteSongs } = this.state;
    const { artistName, collectionName } = artistData;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <span data-testid="artist-name">
            {' '}
            {artistName}
            {' '}
          </span>

          <span data-testid="album-name">
            {collectionName}
            {artistName}
          </span>
          {data.map(
            (item, index) => (<MusicCard
              { ...item }
              key={ index }
              fav={ favoriteSongs }
            />),
          )}

        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.array,
}.isRequired;

export default Album;
