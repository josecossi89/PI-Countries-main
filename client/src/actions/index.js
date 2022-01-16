import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_ACTIVITIES,
  ORDER_BY_NAME,
  SORT_BY_POPULATION,
  GET_COUNTRIES_BY_NAME,
  GET_ACTIVITY,
} from "./constants";
import axios from "axios";

//get info in db
export function getCountries() {
  return async function (dispatch) {
    try {
      var countries = await axios.get("http://localhost:3001/countries");
      return dispatch({
        type: GET_COUNTRIES,
        payload: countries.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//get info for name
export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      let countries = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: countries.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function filterActivity(payload) {
  return {
    type: FILTER_ACTIVITIES,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
}

//get info activities
export function getActivity() {
  return async function (dispatch) {
    var infoActivities = await axios.get(`http://localhost:3001/activity`);
    return dispatch({
      type: GET_ACTIVITY,
      payload: infoActivities.data,
    });
  };
}

//post info activities
export function postActivity(payload) {
  return async function (dispatch) {
    const activities = await axios.post(
      `http://localhost:3001/activity`,
      payload
    );
    return activities;
  };
}
