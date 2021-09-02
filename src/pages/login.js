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
