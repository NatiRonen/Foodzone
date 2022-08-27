import axios from "axios";

export const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const getGeoCodings = async (_address) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${_address}&key=` + MAPS_KEY;
  let resp = await axios(url);
  if (resp.data.status !== "OK") return false;
  return resp.data.results[0].geometry.location;
};
