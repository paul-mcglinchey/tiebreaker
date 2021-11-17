const BASE_URL = process.env.CLIENTSPLASH_API || 'http://localhost:3001/api/'

const ENDPOINTS = {
    "restaurants": BASE_URL + "restaurants"
}

export default ENDPOINTS;