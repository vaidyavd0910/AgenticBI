import axios from "axios";

const BASE_URL = "http://13.218.69.29:8000";

export const fetchQueryResult = async (query,dataset,timerange) => {
  console.log(dataset,timerange, "dropdowns")
  const response = await axios.post(`${BASE_URL}/mock/query`, {
      query,
      dataset,
      timerange
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  console.info(response);
  return response.data;
};

export const addQuestion = async () => {
  const response = await axios.get(`${BASE_URL}/mock/add_questions`);
  console.info(response);
  return response.data;
};

export const getChatHistory = async () => {
  const response = await axios.get(`${BASE_URL}/mock/chat_session`);
  console.info(response);
  return response.data;
};

export const saveMultiChat = async (sessionName, queries) => {
  const response = await axios.post(`${BASE_URL}/mock/save_multi_chat`, {
      session_name: sessionName,
      queries,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.info(queries,"quries")
    return response.data;
};


export const getDatasetAndTimeRange = async () => {
  const response = await axios.get(`${BASE_URL}/datasets`);
  console.info(response);
  return response.data;
};


