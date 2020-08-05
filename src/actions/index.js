import fetchClient from '../apis/bfx_tickers'
import history from '../history'
import {API_REQUEST, API_SUCCESS, API_FAIL} from './types'

import {login, logout, refresh} from './auth'
import {fetchTickers, updateTicker} from './api'

export {login, logout, refresh, fetchTickers, updateTicker}

let bfx = fetchClient()

function apiRequest() {
  return {
    type: API_REQUEST,
  }
}

function apiSuccess(data) {
  return {
    type: API_SUCCESS,
    payload: data,
  }
}

function apiFail(data) {
  return {
    type: API_FAIL,
    payload: data,
  }
}

export const fetchProfile = () => async dispatch => {
  try {
    dispatch(apiRequest())
    const response = await bfx.get('/protected')
    if (response.data.status === 'success') {
      dispatch(apiSuccess(response.data))
    } else {
      dispatch(apiFail(response.data))
      history.push('/auth/login')
    }
  } catch (error) {
    dispatch(apiFail(error.message))
    console.log('fetchProfile error ', error.message)
    history.push('/auth/login')
  }
}
