import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_ACTIVITIES,
  ORDER_BY_NAME,
  SORT_BY_POPULATION,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  allActivities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const filterContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter(
              (element) => element.continent === action.payload
            );
      return {
        ...state,
        countries: filterContinent,
      };

    case FILTER_ACTIVITIES:
      const countryActivity = state.allActivities
        .filter((act) => act.name === action.payload)[0]
        .countries.map((countryAct) => countryAct);
      return {
        ...state,
        countriesFiltered: countryActivity,
      };

    case ORDER_BY_NAME:
      let ordAlf =
        action.payload === "A-Z"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: ordAlf,
      };

    case SORT_BY_POPULATION:
      let ordPob =
        action.payload === "ASC"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: ordPob,
      };

    default:
      return state;
  }
}

export default rootReducer;
