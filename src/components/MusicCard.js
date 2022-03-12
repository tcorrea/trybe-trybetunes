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

  componentDidMount() {
    this.handleCheckedSong();
  }

  handleFavoriteSong = () => {
    const { props } = this;
    const songData = {
      trackId: props.trackId,
      trackName: props.trackName,
    };

    this.setState({ loading: true }, async () => {
      const result = await addSong(songData);
      if (result === 'OK') this.setState({ loading: false });// , checked: result === 'OK' });
    });
  };

  handleCheckedChange = () => {
    this.setState((prev) => ({
      checked: !prev.checked,
    }));
  }

  handleCheckedSong = () => {
    const { fav, trackId } = this.props;
    if (fav.some((item) => item.trackId === trackId)) {
      this.setState({ checked: true });
    }
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
            onChange={ this.handleCheckedChange }
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
