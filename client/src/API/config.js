import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

const BASEAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  }
})

export default BASEAPI;