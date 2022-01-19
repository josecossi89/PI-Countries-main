import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_ACTIVITIES,
  ORDER_BY_NAME,
  SORT_BY_POPULATION,
  GET_COUNTRIES_BY_NAME,
  POST_ACTIVITY,
  GET_ACTIVITY,
  RESET_FILTERS,
  GET_COUNTRY_DETAIL,
  CLEAR_COUNTRY_DETAILS,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  countriesDetails: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //get info in db
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    //filter by continent
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const filterContinent =
        action.payload === "all"
          ? allCountries
          : allCountries.filter(
              (element) => element.continent === action.payload
            );
      return {
        ...state,
        countries: filterContinent,
      };

    //order by name (A-Z && Z-A)
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

    //order by population

    case SORT_BY_POPULATION:
      let ordPob = state.countries;
      if (action.payload === "ASC" || action.payload === "DES") {
        ordPob =
          action.payload === "ASC"
            ? state.countries.sort((a, b) => {
                if (a.population > b.population) {
                  return 1;
                }
                if (b.population > a.population) {
                  return -1;
                }
                return 0;
              })
            : state.countries.sort((a, b) => {
                if (a.population > b.population) {
                  return -1;
                }
                if (b.population > a.population) {
                  return 1;
                }
                return 0;
              });
      }
      return {
        ...state,
        allCountries: ordPob,
      };

    //get countrie by name
    case GET_COUNTRIES_BY_NAME: {
      return {
        ...state,
        countries: action.payload,
      };
    }

    //get info by countrie (details) match id
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    //clear countrie details
    case CLEAR_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetail: {},
      };

    //post info activities (create)
    case POST_ACTIVITY: {
      return {
        ...state,
      };
    }

    //get info activities
    case GET_ACTIVITY: {
      return {
        ...state,
        activities: action.payload,
      };
    }

    //filter activities
    case FILTER_ACTIVITIES:
      return {
        ...state,
        countries:
          action.payload === "all"
            ? state.countries
            : action.payload[0].countries,
      };

    //reset filters and orders
    case RESET_FILTERS:
      return {
        ...state,
        countries: state.countries,
      };

    default:
      return state;
  }
}

export default rootReducer;
