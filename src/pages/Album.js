import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchSongs(id);
  }

  fetchSongs = async (id) => {
    const response = await getMusics(id);
    const songs = response.filter((el) => el.kind === 'song');
    const { artistName, collectionName, artworkUrl30 } = response[0];
    this.setState({
      songs,
      loading: false,
      artistName,
      collectionName,
      artworkUrl30,
    });
  }

  render() {
    const { songs, loading, artistName, collectionName, artworkUrl30 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <h2 data-testid="artist-name">
                { artistName }
              </h2>
              <h3 data-testid="album-name">
                { collectionName }
              </h3>
              <img
                src={ artworkUrl30 }
                alt={ collectionName }
              />
              <MusicCard track={ songs } key={ songs.trackId } />
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
