import { GET_COUNTRIES, FILTER_BY_CONTINENT } from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
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
    default:
      return state;
  }
}

export default rootReducer;
