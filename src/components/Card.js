import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      artistId,
      artistName,
      artworkUrl100,
      collectionId,
      collectionName,
      collectionPrice,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div>
        <span>{artistId}</span>
        <span>{artistName}</span>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Album
        </Link>
        <span>{artworkUrl100}</span>
        <span>{collectionId}</span>
        <span>{collectionName}</span>
        <span>{collectionPrice}</span>
        <span>{releaseDate}</span>
        <span>{trackCount}</span>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string,
  collectionId: PropTypes.string,
}.isRequired;

export default Card;
