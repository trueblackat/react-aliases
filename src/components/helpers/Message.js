import React, { Component } from 'react';
import '../../stylesheets/helpers/message.css';

class Message extends Component {
  render() {
    let { text } = this.props;

    return (
      <div className="message">
        <span>{text}</span>
      </div>
    );
  }
};

export default Message;
