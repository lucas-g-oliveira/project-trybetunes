import React from 'react';
import { PropTypes } from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = { renderContent: '' };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ renderContent: <Loading /> }, async () => {
      const fecthMusics = await getMusics(id);
      this.setState({ renderContent: (
        <div key={ Math.random() }>
          <h5 data-testid="artist-name">{fecthMusics[0].artistName}</h5>
          <h5 data-testid="album-name">{fecthMusics[0].collectionName}</h5>
          <div>
            {
              fecthMusics
                .slice(1)
                .map((e) => (<MusicCard data={ e } key={ Math.random() } />))
            }
          </div>
        </div>
      ) });
    });
  }

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { renderContent } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <h1>{id}</h1>
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
