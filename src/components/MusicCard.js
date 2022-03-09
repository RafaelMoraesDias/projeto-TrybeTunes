import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

      getFavoriteSongs = async () => {
        const { checked } = this.state;
        const { track } = this.props;
        this.setState({
          loading: true });
        await addSong(track);
        this.setState({
          loading: false,
          checked: !checked,
        });
      }

      render() {
        const { track: { trackName, previewUrl, trackId } } = this.props;
        const { loading, checked } = this.state;
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
                        checked={ checked }
                        onChange={ this.getFavoriteSongs }
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
};
export default MusicCard;
