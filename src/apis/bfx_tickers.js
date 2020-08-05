import axios from 'axios'

const fetchClient = () => {
  // Create instance
  const defaultOptions = {
    // baseURL: 'http://127.0.0.1:8000',
    baseURL: 'http://172.22.82.82:7000',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const refreshAccessToken = () => {
    const axiosRefresh = axios.create(defaultOptions)
    const refresh_token = localStorage.getItem('refresh_token')
    axiosRefresh.defaults.headers.common['Authorization'] =
      'Bearer ' + refresh_token

    return axiosRefresh
      .get('/auth/refresh')
      .then(res => {
        const token = res.data.access_token
        localStorage.setItem('access_token', token)
        return token
      })
      .catch(error => {
        console.log('refresh bollocks ', error.response)
      })
  }

  let axiosApiInstance = axios.create(defaultOptions)

  // Add a request interceptor
  axiosApiInstance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access_token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    },
    function (error) {
      // Do something with request error
      console.log('request error ', error.response)
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  axiosApiInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    async function (error) {
      console.log('response error', error.response)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const access_token = await refreshAccessToken()
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        console.log('Returning original request')
        return axiosApiInstance(originalRequest)
      }
      return Promise.reject(error)
    },
  )

  return axiosApiInstance
}

export default fetchClient
