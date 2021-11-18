const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const ENDPOINTS = {
    "restaurants": BASE_URL + "restaurants",
    "cuisines": BASE_URL + "cuisines"
}

export default ENDPOINTS;