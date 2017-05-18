import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import Heartbeat from '../heartbeat';
import UsdJpy from '../pairs/usd_jpy.js';
import socket from '../socket';

class Pricepanel extends ImmutablePureComponent {
  constructor(props){
    super(props);
    this.state = {
      heartbeat: undefined,
      instruments: {
        usd_jpy: {}
      }
    }
  }

  componentDidMount() {
    socket.on('news', (data) => {
      let messages = [];
      try {
        const json = JSON.parse(data)
        messages.push(json);

      } catch(e) {
        const raw_jsons = data.split("\n");
        raw_jsons.forEach( (raw_j) => {
          try{
            const j = JSON.parse(raw_j);
            messages.push(j);
          }catch(ee){
          }
        });
      }

      messages.forEach( (m) => {
        if(typeof m.heartbeat !== 'undefined'){
          this.receiveHeartbeat(m);
        } else if(typeof m.tick !== 'undefined'){
          this.receiveTick(m);
        }
      });
    });
  }

  receiveHeartbeat(message) {
    if(process.env.NODE_ENV === 'development') {
      console.log(message.heartbeat.time);
    }
    this.setState({ heartbeat: message.heartbeat.time });
  }

  receiveTick(message) {
    if(process.env.NODE_ENV === 'development') {
      console.log(message.tick);
    }
    console.log(message.instrument);
    switch (message.tick.instrument) {
      case 'USD_JPY':
        const tick = { instruments: { usd_jpy: { instrument: 'USD_JPY', bid: message.tick.bid } } }; //FIXME
        this.setState(tick);
        console.log('usd_jpy');
        console.log(tick);
        break;
    }
  }

  render () {
    return (
      <div id='fx_pricepanel'>
        <Heartbeat time={this.state.heartbeat || 'undefined'} />
        <UsdJpy instrument={this.state.instruments.usd_jpy.instrument || 'undefined'} bid={this.state.instruments.usd_jpy.bid || '0.00'} />
      </div>
    );
  }

}

export default Pricepanel;
