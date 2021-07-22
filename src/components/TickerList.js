import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { fetchTickers, updateTicker } from '../actions';

import Ticker from './Ticker';

const socket = io('http://127.0.0.1:7000/api', {
  transports: ['websocket'],
});

class TickerList extends Component {
  componentDidMount() {
    this.props.fetchTickers();

    socket.on('connect', () => {
      console.log('test connected you dumb arse');
    });
    socket.on('ticker_update', payload => {
      this.props.updateTicker(payload);
    });
    socket.on('disconnect', () => {
      console.log('Disconnect to server');
    });
  }

  renderList = () => {
    const { coins, pending } = this.props.tickers;

    if (pending) {
      return <div>Loading...</div>;
    }

    const tickList = Object.entries(coins).map(([key, value]) => {
      return (
        <div className="item" key={key}>
          <Ticker ticker={value} />
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

const mapStateToProps = state => {
  return {
    tickers: state.tickers,
  };
};

export default connect(mapStateToProps, {
  updateTicker,
  fetchTickers,
})(TickerList);
