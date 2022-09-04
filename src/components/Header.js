import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = { user: 'Carregando' };

  async componentDidMount() {
    this.setState({ user: <Loading /> }, async () => {
      const nameUser = await getUser();
      this.setState({ user: nameUser.name });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {
        /* <Link to="/search">Search</Link>
            <Link to="/album">Album</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/profile/edit">ProfileEdit</Link>
            <Link to="/">Login</Link>
            <Link to="*">NotFound</Link>
          */
        }
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>

        <section data-testid="header-user-name">{user}</section>
      </header>
    );
  }
}

export default Header;
