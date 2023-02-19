import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    searchMusic: '',
    contentSeach: '',
    inputValue: '',
  };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ searchMusic: value, inputValue: value });
  };

  onClickButton = async () => {
    this.setState(
      { contentSeach: <Loading />, inputValue: '' },
      async () => {
        const { searchMusic } = this.state;
        const fechMusics = await searchAlbumsAPI(searchMusic);
        console.log(fechMusics);
        this.setState({
          contentSeach: fechMusics.map((e) => (
            <div key={ e.collectionId }>
              { e.artistName }
              <br />
              { e.collectionName }
              <br />
              <Link
                data-testid={ `link-to-album-${e.collectionId}` }
                to={ `/album/${e.collectionId}` }
              >
                Detalhes
              </Link>
            </div>
          )),
        });
      },
    );
  };

  render() {
    const { searchMusic, contentSeach, inputValue } = this.state;
    const renderAlbuns = (
      <div>
        {`Resultado de álbuns de: ${searchMusic}`}
        {contentSeach}
      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Seach Music</h1>
        <label htmlFor="search">
          <input
            id="search"
            name="searchMusic"
            data-testid="search-artist-input"
            placeholder="O que você quer ouvir hoje?"
            value={ inputValue }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ (searchMusic.length < 2) }
            onClick={ this.onClickButton }
          >
            Pesquisar
          </button>
        </label>
        <div>{renderAlbuns}</div>
        <div>
          {
            (contentSeach.length === 0 && searchMusic !== '')
              ? <h1>Nenhum álbum foi encontrado</h1> : ''
          }
        </div>
      </div>
    );
  }
}

export default Search;
