import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      disable: true,
      loading: false,
    };
  }

  handleValidateBtn = (event) => {
    const { value } = event.target;
    const MIN_CHAR_ALLOWED = 3;

    if (value.length >= MIN_CHAR_ALLOWED) {
      this.setState({ disable: false });
    }
    this.setState({ name: value });
  }

  handleCreateUser = () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true }, () => {
      createUser({ name }).then(() => {
        this.setState({ loading: false });
        history.push('/search');
      });
    });
  }

  render() {
    const { disable, name, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleValidateBtn }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disable }
            onClick={ this.handleCreateUser }
          >
            Entrar
          </button>
        </form>
        {loading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
