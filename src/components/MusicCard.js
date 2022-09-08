import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loadingState: false,
    checked: false,
  };

  componentDidMount() {
    this.checkedFX();
  }

  checkedFX = async () => {
    const { favoriteList, data } = this.props;
    this.setState(
      { checked: favoriteList.some((e) => (e.trackId === data.trackId)) },
    );
  };

  checkEnabled = async () => {
    const { checked } = this.state;
    const { data, updateFavorites } = this.props;
    console.log('clickEnabled');
    this.setState({
      loadingState: true,
    }, async () => {
      await addSong(data);
      await updateFavorites();
      this.setState({
        loadingState: false,
        checked: !checked,
      });
    });
  };

  checkDisable = async () => {
    console.log('clickDisabled');
    const { data, updateFavorites } = this.props;
    const { checked } = this.state;
    this.setState({
      loadingState: true,
    }, async () => {
      await removeSong(data);
      await updateFavorites();
      this.setState({
        loadingState: false,
        checked: !checked,
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
    const { checked } = this.state;
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
            checked={ checked }
          />
        </label>
      </div>);
  };

  render() {
    const { loadingState } = this.state;
    return (
      <div>
        {(loadingState) ? <Loading /> : this.renderTracks()}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  favoriteList: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
