import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

      getSongs = async (target) => {
        const { track, favorites } = this.props;
        this.setState({
          loading: true });
        if (target.checked === false) {
          await removeSong(track);
        } else {
          await addSong(track);
        }
        this.setState({
          loading: false,
        });
        favorites();
      }

      checkFavorite = (trackId) => {
        const { favoritas } = this.props;
        if (favoritas.length > 0) {
          return favoritas.some((track) => track.trackId === trackId);
        }
        return false;
      }

      render() {
        const { track: { trackName, previewUrl, trackId } } = this.props;
        const { loading } = this.state;
        return (
          <div>
            {loading ? <Loading />
              : (
                <div>
                  { trackName }
                  <div>
                    <audio
                      data-testid="audio-component"
                      src={ previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                    </audio>
                    <label htmlFor="favorites">
                      Favorita:
                      <input
                        data-testid={ `checkbox-music-${trackId}` }
                        name="favorites"
                        type="checkbox"
                        id={ trackId }
                        checked={ this.checkFavorite(trackId) }
                        onChange={ this.getSongs }
                      />
                    </label>
                  </div>
                </div>
              )}
          </div>
        );
      }
}
MusicCard.propTypes = {
  track: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritas: PropTypes.string.isRequired,
  favorites: PropTypes.string.isRequired,
};
export default MusicCard;
