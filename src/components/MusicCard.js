import React from 'react';
import { PropTypes } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data);
    const renderTracks = (
      <div>
        <h4>{data.trackName}</h4>
        <audio data-testid="audio-component" src={ data.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>);
    return (
      <div>
        {renderTracks}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
