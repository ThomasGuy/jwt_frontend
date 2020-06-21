import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTickers } from '../actions';
import Ticker from './Ticker';

class TickerList extends Component {
  componentDidMount() {
    this.props.fetchTickers();
  }

  renderList() {
    const { tickers } = this.props;
    if (!tickers) {
      return <div>Loading...</div>;
    }
    return tickers.map((ticker) => {
      return (
        <div className="item" key={ticker.symbol}>
          <Ticker ticker={ticker} />
        </div>
      );
    });
  }

  render() {
    console.log(this.props.tickers);
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { tickers: state.tickers };
};

export default connect(mapStateToProps, { fetchTickers })(TickerList);
