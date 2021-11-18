import axios from "axios";
import ENDPOINTS from "../config/endpoints"

export const getCuisines = () => {
    
    var cuisines = [];

    const fetchData = async () => {
        const result = await axios(
            ENDPOINTS.cuisines
        );

        cuisines = result.data.data;
    }

    fetchData();

    return cuisines;
}