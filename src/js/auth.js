import axios from 'axios';
import { refs } from './refs';
import { interfaceLogIn, interfaceLogOut } from './interface';
import notification from './notification';
import { httpError } from './errorHandler';

const API_URL = 'https://fchcqj2ahh.execute-api.eu-central-1.amazonaws.com';

axios.defaults.baseURL = API_URL;

refs.loginFormHero.addEventListener('submit', login);
refs.loginFormModal.addEventListener('submit', login);
refs.registerFormModal.addEventListener('submit', register);
refs.logoutBtn.addEventListener('click', logOut);
window.addEventListener('load', currentUser);

async function login(e) {
  e.preventDefault();
  const credentials = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  try {
    const response = await axios.post('/users/login', credentials);
    localStorage.setItem('user', JSON.stringify({ token: response.data.token, email: response.data.user.email }));

    window.location.reload();
    return response;
  } catch (error) {
    httpError(error.response.status);
  }
}

async function register(e) {
  e.preventDefault();
  const credentials = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  try {
    const response = await axios.post('/users/register', credentials);
    notification('User is successfully registered, you can log in', 'success');
    if (response.status === 201) {
      login(e);
    }
    return response;
  } catch (error) {
    httpError(error.response.status);
  }
}

async function currentUser() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get('/users/current');
    response ? interfaceLogIn(response.data.email) : interfaceLogOut();
    return response;
  } catch (error) {}
}

async function logOut() {
  try {
    const response = await axios.post('/users/logout');
    axios.defaults.headers.common.Authorization = '';
    localStorage.setItem('user', JSON.stringify(''));
    window.location.reload();
    return response;
  } catch (error) {
    httpError(error.response.status);
  }
}
