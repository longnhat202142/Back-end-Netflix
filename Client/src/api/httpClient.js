import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8800/api",
});

export default httpClient;
