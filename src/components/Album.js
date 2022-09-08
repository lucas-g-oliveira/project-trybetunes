import React from 'react';
import { PropTypes } from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    renderContent: '',
    favoriteList: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { favoriteList } = this.state;
    const { id } = match.params;
    this.setState({ renderContent: <Loading /> }, async () => {
      const fecthMusics = await getMusics(id);
      await getFavoriteSongs();
      this.updateFavoriteList();
      this.setState({ renderContent: (
        <div key={ Math.random() }>
          <h5 data-testid="artist-name">{fecthMusics[0].artistName}</h5>
          <h5 data-testid="album-name">{fecthMusics[0].collectionName}</h5>
          <div>
            {
              fecthMusics
                .slice(1)
                .map((e) => (
                  <MusicCard
                    data={ e }
                    key={ Math.random() }
                    updateFavorites={ this.updateFavoriteList }
                    favoriteList={ Array.isArray(favoriteList) ? favoriteList : [] }
                  />))
            }
          </div>
        </div>
      ) });
    });
  }

  updateFavoriteList = async () => {
    const list = await getFavoriteSongs();
    this.setState(
      {
        favoriteList: list,
      },
    );
  };

  render() {
    const { renderContent } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { renderContent }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
