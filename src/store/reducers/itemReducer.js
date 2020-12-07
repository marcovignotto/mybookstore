import {
  GOOGLE_SEARCH,
  GOOGLE_SEARCH_CLEAR,
  GOOGLE_SEARCH_SEARCHED,
  ADD_TO_WOO_DB,
  UPDATE_WOO_DB,
  WOO_DB_ALL,
  WOO_DB_IN,
  WOO_DB_OUT,
  WOO_DB_DELETE_ALL,
  WOO_DB_DELETE_IN,
  WOO_DB_DELETE_OUT,
  WOO_DB_SEARCH_STATE,
  WOO_DB_SEARCH_TERM,
  WOO_DB_SEARCH_CLEAR,
  WOO_DB_DATA_READY,
} from "../types";

const initialState = {
  googleSearch: [],
  googleSearched: null,
  wooDbAll: null,
  wooDbIn: null,
  wooDbOut: null,
  wooDbSearchState: null,
  wooDbSearchTerm: null,
  wooDbDataReady: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SEARCH:
      return {
        ...state,
        googleSearch: action.payload,
        loading: false,
      };

    case GOOGLE_SEARCH_CLEAR:
      return {
        ...state,
        googleSearch: [],
        loading: false,
      };

    case GOOGLE_SEARCH_SEARCHED:
      return {
        ...state,
        googleSearched: action.payload,
        loading: false,
      };
    case WOO_DB_ALL:
      return {
        ...state,
        wooDbAll: action.payload,
        loading: false,
      };
    case WOO_DB_IN:
      return {
        ...state,
        wooDbIn: action.payload,
        loading: false,
      };

    case WOO_DB_OUT:
      return {
        ...state,
        wooDbOut: action.payload,
        loading: false,
      };
    case WOO_DB_DELETE_ALL:
      if (state.wooDbAll === null) {
        return state;
      } else {
        return {
          ...state,
          wooDbAll: state.wooDbAll.filter((item) => item.id !== action.payload),
          loading: false,
        };
      }

    case WOO_DB_DELETE_IN:
      if (state.wooDbIn === null) {
        return state;
      } else {
        return {
          ...state,
          wooDbIn: state.wooDbIn.filter((item) => item.id !== action.payload),
          loading: false,
        };
      }
    case WOO_DB_DELETE_OUT:
      if (state.wooDbOut === null) {
        return state;
      } else {
        const idToFind = action.payload; // arriva ID
        const arrayIds = state.wooDbOut.map((item) => console.log(item.id));
        const found = arrayIds.find((element) => element === idToFind);
        return {
          ...state,
          wooDbOut: state.wooDbOut.filter((item) => item.id !== action.payload),
          loading: false,
        };
      }

    case WOO_DB_SEARCH_STATE:
      return {
        ...state,
        wooDbSearchState: action.payload,
      };

    case WOO_DB_SEARCH_TERM:
      return {
        ...state,
        wooDbSearchTerm: action.payload,
      };

    case WOO_DB_DATA_READY:
      return {
        ...state,
        wooDbDataReady: action.payload,
        loading: false,
      };

    case WOO_DB_SEARCH_CLEAR:
      return {
        ...state,
        wooDbSearchTerm: null,
        wooDbAll: null,
        wooDbIn: null,
        wooDbOut: null,
        wooDbSearchState: null,
        loading: false,
      };

    default:
      return state;
  }
};
