import axios from 'axios';
import { refs } from './refs';
import notification from './notification';
import { httpError } from './errorHandler';
import { createVisitorsTable } from './createMarkup';

const API_URL = 'https://fchcqj2ahh.execute-api.eu-central-1.amazonaws.com';

axios.defaults.baseURL = API_URL;

refs.addVisitor.addEventListener('submit', createVisitor);
window.addEventListener('load', getAllVisitors);
refs.visitorsTable.addEventListener('click', getVisitorId);
refs.visitorsFormEdit.addEventListener('submit', editVisitor);
refs.visitorsDelete.addEventListener('click', deleteVisitor);

let id = null;

async function createVisitor(e) {
  e.preventDefault();
  const credentials = {
    firstName: e.target[0].value,
    lastName: e.target[1].value,
  };
  try {
    const response = await axios.post('/api/visitors', credentials);
    notification('A visitor entered the building', 'success');
    window.location.reload();
    return response;
  } catch (error) {
    httpError(error.response.status);
  }
}

async function getAllVisitors() {
  try {
    const response = await axios.get('/api/visitors');
    createVisitorsTable(response.data);
  } catch (error) {}
}

async function getVisitorId(e) {
  id = e.target.dataset.id;
}

async function editVisitor(e) {
  e.preventDefault();
  const credentials = {
    firstName: e.target[0].value,
    lastName: e.target[1].value,
  };
  try {
    if (id) {
      const response = await axios.put(`/api/visitors/${id}`, credentials);
      if (response) window.location.reload();
    }
  } catch (error) {
    httpError(error.response.status);
  }
}

async function deleteVisitor() {
  try {
    const response = await axios.delete(`/api/visitors/${id}`);
    if (response) window.location.reload();
  } catch (error) {
    httpError(error.response.status);
  }
}
