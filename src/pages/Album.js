import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchSongs(id);
  }

  fetchSongs = async (id) => {
    const response = await getMusics(id);
    const songs = response.filter((el) => el.kind === 'song');
    const { artistName, collectionName, artworkUrl100 } = response[0];
    this.setState({
      songs,
      artistName,
      collectionName,
      artworkUrl100,
    });
  }

  render() {
    const { songs, artistName, collectionName, artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="container">
          <div className="infos">
            <h2 data-testid="artist-name">
              {artistName}
            </h2>
            <h3 data-testid="album-name">
              {collectionName}
            </h3>
            <img
              src={ artworkUrl100 }
              alt={ collectionName }
            />
          </div>
          <div className="player">
            {songs.map((el) => (
              <MusicCard
                track={ el }
                key={ el.trackId }
              />
            ))}
          </div>
        </div>
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
