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

  getSongs = async (event) => {
    const { track, favorites } = this.props;
    this.setState({
      loading: true });
    if (event.target.checked) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    this.setState({
      loading: false,
    });
    await favorites();
  };
  // função que pega o clique do usuario e adiciona ou remove da lista de favoritos,
  // e altera o estado de loading, funçao favorites é chamada no final pra voltar a aparecer as opções marcadas e permitir marcar novas

    checkFavorite = (trackId) => {
      const { favoritas } = this.props;
      return favoritas.some((el) => el.trackId === trackId);
      // if (favoritas.length !== 0) {
      //   return favoritas.some((el) => el.trackId === trackId);
      // }
      // return false;
    };
    // função que verifica se tem favoritas salvas e retorna a que da match com o ID

    render() {
      const { track: { trackName, previewUrl, trackId } } = this.props;
      // const { artistName, collectionName } = this.props;
      const { loading } = this.state;
      return (
        <div>
          {loading ? <Loading />
            : (
              <div>
                {trackName}

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
                      onChange={ this.getSongs }
                      checked={ this.checkFavorite(trackId) }
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

// requisito feito com ajuda de Lais Nametala e com pesquisa no
// código de queite castiglione para entender a lógica.
