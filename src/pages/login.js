import React from 'react';

class LoginScreen extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          Nickname:
          <input
            data-testid="input-player-name"
            id="name"
            name="name"
            type="text"
            placeholder="Seu Nickname"
            value={ name }
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
