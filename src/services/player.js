import axios from 'axios';

const getProfile = (token) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.get('http://82.165.2.37:3000/profile', config);
  return request.then(response => response.data);
}

export default { getProfile }