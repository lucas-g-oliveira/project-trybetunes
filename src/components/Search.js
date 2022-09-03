import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    searchMusic: '',
  };

  handleChange = async (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({ searchMusic: value });
  };

  render() {
    const { searchMusic } = this.state;
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
            value={ searchMusic }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ (searchMusic.length < 2) }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

export default Search;
