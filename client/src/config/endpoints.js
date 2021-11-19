const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "customers": BASE_URL + "customers",
}

export default endpoints;