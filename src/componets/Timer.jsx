import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div>
        <span>{timer}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};
export default Timer;
