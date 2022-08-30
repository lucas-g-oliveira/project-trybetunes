import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <div>
          <input
            testid="login-name-input"
            placeholder="User"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled=""
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
