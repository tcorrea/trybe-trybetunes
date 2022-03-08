import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      artistData: {},
      // loading: false,
    };
  }

  componentDidMount() {
    this.handleGetMusic();
  }

  handleGetMusic = async () => {
    const { match } = this.props;
    // const artistData = location.query;
    // console.log(testData);
    const result = await getMusics(match.params.id);
    // console.log(result);
    const [artistData, ...rest] = result;
    console.log(rest);
    this.setState({ data: rest, artistData });
    // console.log(this.state);
  };

  render() {
    const { data, artistData } = this.state;
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
          {data.map((item, index) => <MusicCard { ...item } key={ index } />)}

        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.array,
}.isRequired;

export default Album;
