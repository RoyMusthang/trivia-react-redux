import React from 'react';

class LoginScreen extends React.Component {
  render() {
    return (
      <form>
        <label>
          Nickname:
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            placeholder="Seu Nickname"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Seu Email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={'logica'}
        >
          Jogar
        </button>
      </form>
    )
  }
}

export default LoginScreen;
