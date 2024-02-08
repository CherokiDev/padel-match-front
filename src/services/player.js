import axios from 'axios';

let token = null;

const setToken = newToken => {
  token = newToken;
}

const getProfile = () => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.get('http://82.165.2.37:3000/profile', config);
  return request.then(response => response.data);
}

export default { getProfile, setToken }