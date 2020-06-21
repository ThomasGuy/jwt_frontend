import bfx from '../apis/bfx_tickers';

export const fetchTickers = () => async (dispatch) => {
  const response = await bfx.get('/api/tickers');
  console.log('response ', response.data['data']);
  dispatch({
    type: 'FETCH_TICKERS',
    payload: response.data['data'],
  });
};
