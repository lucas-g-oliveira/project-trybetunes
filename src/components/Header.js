import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = { user: 'Carregando' };

  async componentDidMount() {
    this.setState({ user: <Loading /> }, async () => {
      const nameUser = await getUser();
      console.log(nameUser.name);
      this.setState({ user: nameUser.name });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user}</p>
      </header>
    );
  }
}

export default Header;
