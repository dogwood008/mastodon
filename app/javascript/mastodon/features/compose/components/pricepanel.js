import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import Heartbeat from '../heartbeat';
import socket from '../socket';

class Pricepanel extends ImmutablePureComponent {
  constructor(props){
    super(props);
    this.state = {
      heartbeat: undefined
    }
  }

  componentDidMount() {
    socket.on('news', (data) => {
      let json = JSON.parse(data)
      if(typeof json.heartbeat !== 'undefined'){
        this.receiveHeartbeat(json);
      }
    });
  }

  receiveHeartbeat(message) {
    if(process.env.NODE_ENV === 'development') {
      console.log(message.heartbeat.time);
    }
    this.setState({ heartbeat: message.heartbeat.time });
  }

  render () {
    return (
      <div id='fx_pricepanel'>
        <Heartbeat time={this.state.heartbeat || 'undefined'} />
      </div>
    );
  }

}

export default Pricepanel;
