import React from 'react';
import Header from './Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
  };

  componentDidMount() { this.updateFavoriteList(); }

  updateFavoriteList = async () => {
    const list = await getFavoriteSongs();
    this.setState({ favoriteList: list }, async () => 'OK');
  };

  rendeView = () => {
    const { favoriteList } = this.state;
    return (favoriteList.map((e) => (
      <MusicCard
        key={ Math.random() }
        data={ e }
        updateFavorites={ this.updateFavoriteList }
        checked={
          favoriteList.some((j) => (e.trackId === j.trackId))
        }
      />)));
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        <div>
          { (loading) ? <Loading /> : this.rendeView() }
        </div>
      </div>
    );
  }
}

export default Favorites;
