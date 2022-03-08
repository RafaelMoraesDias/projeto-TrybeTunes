import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      input: '',
      loading: false,
      result: [],
      error: false,
      busca: '',
    };
  }

  validateButton2 = ({ target }) => {
    const nummax = 2;
    this.setState({
      input: target.value,
      busca: target.value,
      disable: target.value.length < nummax,
    });
  };

  SendButton = async () => {
    const { busca } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const response = await searchAlbumsAPI(busca);
      if (response.length === 0) {
        this.setState({
          error: true,
        });
      }
      this.setState({
        loading: false,
        result: response,
        input: '',
      });
    });
  }

  render() {
    const { disable, loading, result, input, error, busca } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            value={ input }
            type="text"
            data-testid="search-artist-input"
            name="name"
            onChange={ this.validateButton2 }
          />
          {' '}
          NOME

          <button
            name="username"
            type="submit"
            disabled={ disable }
            data-testid="search-artist-button"
            onClick={ this.SendButton }
          >
            ENTRAR
          </button>
        </div>
        {loading
          ? <Loading />
          : (
            <div>
              {
                <p>
                  {`Resultado de álbuns de: ${busca}`}
                </p>
              }
              {
                result.map((elem, index) => (
                  <div key={ index } className="listAlbum">
                    <Link
                      data-testid={ `link-to-album-${elem.collectionId}` }
                      to={ `/album/${elem.collectionId}` }
                    >
                      <img src={ elem.artworkUrl100 } alt="album" />
                      <p>
                        {' '}
                        { elem.collectionName }
                      </p>
                      <p>
                        {' '}
                        { elem.artistName }
                        {' '}
                      </p>
                    </Link>
                  </div>
                ))
              }
            </div>
          )}
        { error === true && 'Nenhum álbum foi encontrado' }
      </div>
    );
  }
}

export default Search;

// Requisito concluido, com ajuda e referências do thiago Zardo
