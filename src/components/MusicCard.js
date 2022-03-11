import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleFavoriteSong = () => {
    const { props } = this;
    const songData = {
      amgArtistId: props.amgArtistId,
      artistId: props.artistId,
      artistName: props.artistName,
      artistViewUrl: props.artistViewUrl,
      artworkUrl60: props.artworkUrl60,
      artworkUrl100: props.artworkUrl100,
      collectionCensoredName: props.collectionCensoredName,
      collectionExplicitness: props.collectionExplicitness,
      collectionId: props.collectionId,
      collectionName: props.collectionName,
      collectionPrice: props.collectionPrice,
      collectionType: props.collectionType,
      collectionViewUrl: props.collectionViewUrl,
      contentAdvisoryRating: props.contentAdvisoryRating,
      copyright: props.copyright,
      country: props.country,
      currency: props.currency,
      primaryGenreName: props.primaryGenreName,
      releaseDate: props.releaseDate,
      trackCount: props.trackCount,
      wrapperType: props.wrapperType,
    };

    this.setState({ loading: true }, async () => {
      const result = await addSong(songData);
      this.setState({ loading: false, checked: result === 'OK' });
    });
  };

  handleCheckedSong = () => {
    this.setState((prev) => ({
      checked: !prev.checked,
    }));
  }

  trackComponent = () => {
    const { trackId, trackName, previewUrl } = this.props;
    const { checked } = this.state;

    return (
      <>
        <span>{trackName}</span>

        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFavoriteSong }
            onChange={ this.handleCheckedSong }
            checked={ checked }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          {/* <audio data-testid="audio-component" controls> */}
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  };

  render() {
    const { loading } = this.state;
    return (loading ? <Loading /> : this.trackComponent());
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
