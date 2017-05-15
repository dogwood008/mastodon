import React from 'react';

export default class Heartbeat extends React.Component {
  render() {
    return(
        <div className="heartbeat_time">
          Last Updated: { this.props.time }
        </div>
    );
  }
}
