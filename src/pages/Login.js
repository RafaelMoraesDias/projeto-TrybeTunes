import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      disable: true,
      loading: false,
      redirection: false,
    };
  }

enableButton = () => {
  const { username } = this.state;
  this.setState({
    loading: true,
  },
  async () => {
    await createUser({ name: username });
    this.setState({
      loading: false,
      redirection: true,
    });
  });
}

validateButton = ({ target }) => {
  const nummax = 3;
  this.setState({
    disable: target.value.length < nummax,
    username: target.value,
  });
};

render() {
  const { disable, loading, redirection } = this.state;
  return (
    <div data-testid="page-login">
      { !loading ? (
        <form>

          <input
            type="text"
            data-testid="login-name-input"
            name="name"
            onChange={ this.validateButton }
          />
          {' '}
          NOME

          <button
            name="username"
            type="submit"
            disabled={ disable }
            data-testid="login-submit-button"
            onClick={ this.enableButton }
          >
            ENTRAR

          </button>

        </form>
      ) : <Loading /> }
      {redirection && <Redirect to="/search" /> }
    </div>
  );
}
}

export default Login;
