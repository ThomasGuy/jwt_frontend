import React, { Component } from 'react';
import { connect } from 'react-redux';
// import jwtDecode from 'jwt-decode';

import { fetchTickers } from '../actions';
// import expired from '../util/expired';
// import Ticker from './Ticker';

class TickerList extends Component {
  componentDidMount() {
    // let auth = expired;
    this.props.fetchTickers(this.props.auth);
  }

  renderList = () => {
    // console.log(jwtDecode(this.props.auth));
    if (!this.props.tickers) {
      return <div>Loading...</div>;
    }
    const tickList = this.props.tickers.map((tick) => {
      return (
        <div className="item" key={tick.symbol}>
          {tick.symbol}:{tick.last_price}
        </div>
      );
    });

    return <div>{tickList}</div>;
  };

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.authToken,
    tickers: Object.values(state.tickers),
  };
};

export default connect(mapStateToProps, { fetchTickers })(TickerList);
