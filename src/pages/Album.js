import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      favoritas: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.favorites();
    this.fetchSongs(id);
  }

favorites = async () => {
  this.setState({ loading: true });
  const myMusics = await getFavoriteSongs();
  this.setState({
    favoritas: myMusics,
    loading: false,
  });
}

  fetchSongs = async (id) => {
    const response = await getMusics(id);
    const songs = response.filter((el) => el.kind === 'song');
    const { artistName, collectionName } = response[0];
    console.log(artistName);
    this.setState({
      songs,
      artistName,
      collectionName,
    });
  }

  render() {
    const { songs, artistName, collectionName,
      loading, favoritas } = this.state;
    // console.log(artistName);
    return (
      <div data-testid="page-album">
        <Header />
        <div className="container">
          {loading ? <Loading />
            : (
              <>
                <div className="infos">
                  <h2 data-testid="artist-name">
                    { artistName }
                  </h2>
                  <h3 data-testid="album-name">
                    { collectionName }
                  </h3>
                </div>
                <div className="player">
                  {songs.map((el) => (
                    <MusicCard
                      track={ el }
                      key={ el.trackId }
                      favoritas={ favoritas }
                      favorites={ this.favorites }
                    />
                  ))}
                </div>
              </>
            )}
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
