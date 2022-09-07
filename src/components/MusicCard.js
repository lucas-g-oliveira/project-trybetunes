import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loadingState: false,
    listFavorite: [],
  };

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    const listFavoritesFetch = await getFavoriteSongs();
    this.setState({
      listFavorite: listFavoritesFetch,
    });
  };

  checkEnabled = async () => {
    const { data } = this.props;
    this.setState({
      loadingState: true,
    }, async () => {
      await addSong(data);
      const listFavoritesFetch = await getFavoriteSongs();
      this.setState({
        loadingState: false,
        listFavorite: listFavoritesFetch,
      });
    });
  };

  checkDisable = async () => {
    const { data } = this.props;
    this.setState({
      loadingState: true,
    }, async () => {
      await removeSong(data);
      const listFavoritesFetch = await getFavoriteSongs();
      this.setState({
        loadingState: false,
        listFavorite: listFavoritesFetch,
      });
    });
  };

  handherChecked = async (event) => {
    const { checked } = event.target;
    if (checked) {
      this.checkEnabled();
    } else {
      this.checkDisable();
    }
  };

  /*  {.flter((e) => (e.trackId === event.target.name))} */

  renderTracks = () => {
    const { data } = this.props;
    const { listFavorite } = this.state;
    return (
      <div>
        <h4>{data.trackName}</h4>
        <audio data-testid="audio-component" src={ data.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <label
          htmlFor="favorite"
        >
          Favorita
          <input
            id="favorite"
            data-testid={ `checkbox-music-${data.trackId}` }
            name={ data.trackId }
            type="checkbox"
            onChange={ this.handherChecked }
            checked={ listFavorite.some((e) => (e.trackId === data.trackId)) }
          />
        </label>
      </div>);
  };

  render() {
    const { loadingState, listFavorite } = this.state;
    const { data } = this.props;
    console.log(listFavorite.length);
    console.log(listFavorite.some((e) => (e.trackId === data.trackId)));
    return (
      <div>
        {(loadingState) ? <Loading /> : this.renderTracks()}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
