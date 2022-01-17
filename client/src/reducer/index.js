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
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
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

    // case FILTER_ACTIVITIES:
    //   const countryActivity = state.allActivities
    //     .filter((act) => act.name === action.payload)[0]
    //     .countries.map((countryAct) => countryAct);
    //   return {
    //     ...state,
    //     countriesFiltered: countryActivity,
    //   };

    case FILTER_ACTIVITIES:
      const activitiesFilter = state.countries.filter(
        (c) =>
          c.activities &&
          c.activities.map((a) => a.name).includes(action.payload)
      );
      return {
        ...state,
        allCountries:
          action.payload === "all" ? state.countries : activitiesFilter,
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
      return {
        ...state,
        allCountries: ordPob,
      };

    case GET_COUNTRIES_BY_NAME: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case GET_ACTIVITY: {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case POST_ACTIVITY: {
      return {
        ...state,
      };
    }
    case RESET_FILTERS:
      return {
        ...state,
        countries: state.countries,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case CLEAR_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetail: {},
      };

    default:
      return state;
  }
}

export default rootReducer;
