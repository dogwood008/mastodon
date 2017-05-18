import React from 'react';

export default class UsdJpy extends React.Component {
  render() {
    return(
        <div className="pair">
          <div className="pair_name">
            { this.props.instrument }
          </div>
          <div className="pair_bid">
            { this.props.bid }
          </div>
        </div>
    );
  }
}
