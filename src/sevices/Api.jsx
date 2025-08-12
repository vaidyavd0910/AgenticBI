import axios from "axios";

const BASE_URL = "http://13.218.69.29:8000";

export const fetchQueryResult = async(query) => {
    const response = await axios.get(`${BASE_URL}/query?`, {
         params: { q: query }
    });
    console.info(response);
    return response.data;
};