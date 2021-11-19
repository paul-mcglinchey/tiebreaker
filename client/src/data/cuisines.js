import ENDPOINTS from "../config/endpoints"

export async function getCuisines() {
    const cuisines = await fetch(ENDPOINTS.cuisines)
        .then(response => response.json())
        .then(data => data.data)
    return cuisines;
}