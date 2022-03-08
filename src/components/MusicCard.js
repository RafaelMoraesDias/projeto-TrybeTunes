import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { track } = this.props;
    return (
      <div>
        { track.map((song, index) => (
          <div key={ index }>
            { song.trackName }
            <div>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
MusicCard.propTypes = {
  track: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MusicCard;
