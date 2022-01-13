import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  ACTIVITY_FILTER,
} from "./constants";
import axios from "axios";

//get info in db
export function getCountries() {
  return async function (dispatch) {
    var countries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: countries.data,
    });
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function activityFilter(payload) {
  return {
    type: ACTIVITY_FILTER,
    payload,
  };
}
