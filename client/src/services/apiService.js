import axios from "axios";
import { getStoreLocal } from "./localService";

export const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3002";
export const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

export const doApiGet = async (_url, _storeId = null) => {
  let store = getStoreLocal();
  try {
    let data = await axios.get(_url, {
      headers: {
        // send header for authentication when it needed
        "store-id": store._id,
        "x-api-key": localStorage["tok"],
        "content-type": "application/json",
      },
      // withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const doApiMethod = async (_url, _method, _body, _storeId = null) => {
  let store = getStoreLocal();
  try {
    let data = await axios({
      method: _method,
      url: _url,
      data: JSON.stringify(_body),
      headers: {
        "store-id": store._id,
        "x-api-key": localStorage["tok"],
        "content-type": "application/json",
      },
      // withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
