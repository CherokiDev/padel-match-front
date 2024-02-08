import axios from 'axios';

const baseUrl = 'http://82.165.2.37:3000/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
