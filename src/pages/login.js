import React from 'react';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      email: '',
      validate: {
        validateNickname: false,
        validateEmail: false
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  ////////////////////////////////////////////////
  emailValidation() {
    const { email, validate } = this.state;
    const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    if (EMAIL_VALIDATION.test(email)) {
      return this.setState({ // bug achado com ajuda de rogerio p. da silva
        validate: {
          ...validate,
          login: true,
        },
      });
    }
    this.setState({ validate: { ...validate, login: false } });
  }

  passwordValidation() {
    const { password, validate } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length >= MIN_PASSWORD_LENGTH) {
      return this.setState({
        validate: {
          ...validate,
          password: true,
        },
      });
    }
    this.setState({ validate: { ...validate, password: false } });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
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
          disabled
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginScreen;
