import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import fetchTokenApi from './index';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      email: '',
      validate: {
        validateNickname: false,
        validateEmail: false,
      },
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.nicknameValidation = this.nicknameValidation.bind(this);
  }

  componentDidMount() {
    fetchTokenApi();
  }

  handleChange({ target }) {
    const { value, name } = target;
    if (name === 'email') {
      this.emailValidation(value);
      return this.setState({ [name]: value });
    } if (name === 'nickname') {
      this.nicknameValidation(value);
      return this.setState({ [name]: value });
    }
  }

  emailValidation(value) {
    const { validate } = this.state;
    const EMAIL_VALIDATION = /\S+@\S+\.\S+/;
    if (EMAIL_VALIDATION.test(value)) {
      return this.setState({
        validate: {
          ...validate,
          validateEmail: true,
        },
      });
    }
    return this.setState({ validate: { ...validate, login: false } });
  }

  nicknameValidation(value) {
    const { validate } = this.state;
    const MIN_NICKNAME_LENGTH = 1;
    if (value.length >= MIN_NICKNAME_LENGTH) {
      return this.setState({
        validate: {
          ...validate,
          validateNickname: true,
        },
      });
    }
    return this.setState({ validate: { ...validate, validateNickname: false } });
  }

  handleClick() {
    const { nickname, email } = this.state;
    const players = {
      player: {
        name: nickname,
        assertions: '',
        score: '',
        gravatarEmail: email,
      },
    };
    this.setState({ shouldRedirect: true });
    localStorage.setItem('state', JSON.stringify(players));
  }

  render() {
    const { nickname, email, validate, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/game" />;
    return (
      <form>
        <label htmlFor="name">
          Nickname:
          <input
            data-testid="input-player-name"
            id="name"
            name="nickname"
            type="text"
            placeholder="Seu Nickname"
            value={ nickname }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="email"
            name="email"
            placeholder="Seu Email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play"
          disabled={ !validate.validateEmail || !validate.validateNickname }
        >
          Jogar
        </button>
        <Link to="/config" data-testid="btn-settings">Settings</Link>
      </form>
    );
  }
}

LoginScreen.propTypes = {
  sendLoginInfo: PropTypes.func,
}.isRequired;

export default LoginScreen;
