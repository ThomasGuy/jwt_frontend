import axios from 'axios';

export default axios.create({
  baseURL: 'http://172.30.124.232:8080',
  // baseURL: 'http://127.0.0.1:5000',
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTI3MjQwODYsIm5iZiI6MTU5MjcyNDA4NiwianRpIjoiOWNmNzhjZmQtMDBmNi00NTkyLThiNjQtZTFjZTBkZWZmMmRlIiwiZXhwIjoxNTkyNzMwNjg2LCJpZGVudGl0eSI6Ijg1NzAzOTdjLTAzYjEtNDkyYy1iODMxLWE0OWM5ZGUyOTNhMCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.KlYX7PZr8O1dNlfLnHryrjkP3Uc_4-oyeYrfcHsyBxU',
  },
});
