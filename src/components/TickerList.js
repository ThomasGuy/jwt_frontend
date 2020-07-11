import React, { Component } from 'react';
import { connect } from 'react-redux';
// import jwtDecode from 'jwt-decode';

import { fetchTickers } from '../actions';
import Ticker from './Ticker';

class TickerList extends Component {
  componentDidMount() {
    this.props.fetchTickers();
  }

  renderList = () => {
    if (!this.props.tickers) {
      return <div>Loading...</div>;
    }

    const tickList = this.props.tickers.map((tick) => {
      return (
        <div className="item" key={tick.symbol}>
          <Ticker ticker={tick} />
        </div>
      );
    });

    return <div>{tickList}</div>;
  };

  render() {
    return (
      <>
        <div className="ui divided list">{this.renderList()}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickers: Object.values(state.tickers),
  };
};

export default connect(mapStateToProps, { fetchTickers })(TickerList);
