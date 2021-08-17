/* eslint-disable no-console */
import axios from 'axios';

let called = false;

export default function axiosDebugger() {
  if (called) {
    return;
  }
  called = true;
  if (__DEV__) {
    axios.interceptors.request.use((request) => {
      console.log([`${request.method.toUpperCase()} ${request.url || ''}`]);
      if (request.data) {
        console.log(JSON.stringify(request.data));
      }
      console.log(request.headers);
      return request;
    });

    axios.interceptors.response.use((response) => {
      console.log([
        `${response.status} ${response.config.url}`,
        '\n',
        response.data,
      ]);
      return response;
    });
  }
}
