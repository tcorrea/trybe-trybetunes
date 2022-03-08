import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <>
        <span>{trackName}</span>
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
  }
}

export default MusicCard;
