import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loadingState: false,
    favorite: false,
    favoriteList: [],
  };

  handherChecked = async (event) => {
    const { checked } = event.target;
    const { data } = this.props;
    const { favorite, favoriteList } = this.state;
    if (checked) {
      this.setState({
        loadingState: true,
        favoriteList: [...favoriteList, data],
      }, async () => {
        await addSong(favoriteList);
        this.setState({
          favorite: !favorite,
          loadingState: false,
        });
      });
    }
  };

  /*  {.flter((e) => (e.trackId === event.target.name))} */

  renderTracks = () => {
    const { data } = this.props;
    const { favorite } = this.state;
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
            checked={ favorite }
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
};

export default MusicCard;
