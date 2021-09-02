import React from 'react';

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
      this.emailValidation();
      return this.setState({ [name]: value });
    } if (name === 'nickname') {
      this.nicknameValidation();
      return this.setState({ [name]: value });
    }
  }

  emailValidation() {
    const { email, validate } = this.state;
    const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    if (EMAIL_VALIDATION.test(email)) {
      return this.setState({
        validate: {
          ...validate,
          validateEmail: true,
        },
      });
    }
    this.setState({ validate: { ...validate, login: false } });
  }

  nicknameValidation() {
    const { nickname, validate } = this.state;
    const MIN_NICKNAME_LENGTH = 1;
    if (nickname.length >= MIN_NICKNAME_LENGTH) {
      return this.setState({
        validate: {
          ...validate,
          validateNickname: true,
        },
      });
    }
    this.setState({ validate: { ...validate, validateNickname: false } });
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
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginScreen;
