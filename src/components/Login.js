import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = { loading: '' };

  onClickButton = async () => {
    const { userName } = this.props;
    this.setState(
      { loading: <Loading className="loading" /> },
      async () => {
        await createUser({ name: userName });
        this.setState({ loading: <Redirect to="/search" /> });
      },
    );
  };

  render() {
    const { userName, handlerChange } = this.props;
    const { loading } = this.state;
    const magicNumber = 3;

    return (
      <div data-testid="page-login">
        <div>
          <input
            data-testid="login-name-input"
            placeholder="User"
            value={ userName }
            onChange={ handlerChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ userName.length < magicNumber }
            onClick={ this.onClickButton }
          >
            Entrar
          </button>
          { loading }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
};

export default Login;
