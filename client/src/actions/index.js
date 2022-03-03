import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_ACTIVITIES,
  ORDER_BY_NAME,
  SORT_BY_POPULATION,
  GET_COUNTRIES_BY_NAME,
  GET_ACTIVITY,
  RESET_FILTERS,
  GET_COUNTRY_DETAIL,
  CLEAR_COUNTRY_DETAILS,
} from "./constants";
import axios from "axios";

//get info in db
export function getCountries() {
  return async function (dispatch) {
    try {
      var countries = await axios.get(
        "https://countrieapp.herokuapp.com/countries"
      );
      return dispatch({
        type: GET_COUNTRIES,
        payload: countries.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//filter by continent
export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

//order by name (A-Z && Z-A)
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

//order by population
export function orderByPopulation(payload) {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
}

//get countrie by name
export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      let countries = await axios.get(
        `https://countrieapp.herokuapp.com/countries?name=${name}`
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
export function getClima() {
  return async function (dispatch) {
    try {
      let countries = await axios.get(`https://restcountries.com/v3/all`);
      console.log(countries);
    } catch (error) {
      console.log(error);
    }
  };
}

//get info by countrie (details) match id
export function getCountryDetails(id) {
  return async (dispatch) => {
    try {
      const details = await axios.get(
        "https://countrieapp.herokuapp.com/countries/" + id
      );
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: details.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//clear countrie details
export function clearCountryDetail() {
  return { type: CLEAR_COUNTRY_DETAILS };
}

//post info activities (create)
export async function postActivity(payload) {
  const activities = await axios.post(
    `https://countrieapp.herokuapp.com/activity`,
    payload
  );
  return activities;
}

//get info activities
export function getActivity() {
  return async function (dispatch) {
    var activities = await axios.get(
      `https://countrieapp.herokuapp.com/activity`
    );
    return dispatch({
      type: GET_ACTIVITY,
      payload: activities.data,
    });
  };
}
//filter activities
export function filterActivity(payload) {
  return async function (dispatch) {
    const activities = await axios.get(
      `https://countrieapp.herokuapp.com/activity/?name=${payload}`
    );
    return dispatch({
      type: FILTER_ACTIVITIES,
      payload: activities.data,
    });
  };
}

//reset filters and orders
export const resetFilters = () => {
  return { type: RESET_FILTERS };
};
