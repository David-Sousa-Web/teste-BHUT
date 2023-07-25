import axios from "axios";

export const api = axios.create({
  baseURL: "http://api-test.bhut.com.br:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
