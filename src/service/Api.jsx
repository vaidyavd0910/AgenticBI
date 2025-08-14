import axios from "axios";

const BASE_URL = "http://13.218.69.29:8000";

export const fetchQueryResult = async (query) => {
  const response = await axios.get(`${BASE_URL}/mock/query`, {
    params: { q: query }
  });
  console.info(response);
  return response.data;
};

export const addQuestion = async () => {
  const response = await axios.get(`${BASE_URL}/mock/add_questions`);
  console.info(response);
  return response.data;
};



