import React from 'react';
import { Link } from 'react-router-dom';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.nicknameValidation = this.nicknameValidation.bind(this);
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

  handleClick() {
    const { email, validate } = this.state;
    const { history, dispatchInputLogin } = this.props;
    dispatchInputLogin(email);
    if (validate.validateEmail && validate.validateNickname) history.push('/carteira');
  };

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

  render() {
    const { nickname, email, validate } = this.state;
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
          type="button"
          data-testid="btn-play"
          disabled={ !validate.validateEmail || !validate.validateNickname }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/config" data-testid="btn-settings">Settings</Link>
      </form>
    );
  }
}

export default LoginScreen;
