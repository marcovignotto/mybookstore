import {
  GOOGLE_SEARCH,
  GOOGLE_SEARCH_ERROR,
  GOOGLE_SEARCH_CLEAR,
  GOOGLE_SEARCH_CLEAR_ERROR,
  GOOGLE_SEARCH_SEARCHED,
  GOOGLE_SEARCH_SEARCHED_ERROR,
  // ADD_TO_WOO_DB,
  ADD_TO_WOO_DB_ERROR,
  // UPDATE_WOO_DB,
  UPDATE_WOO_DB_ERROR,
  WOO_DB_ALL,
  WOO_DB_IN,
  WOO_DB_OUT,
  WOO_DB_ERROR,
  WOO_DB_DELETE_ALL,
  WOO_DB_DELETE_IN,
  WOO_DB_DELETE_OUT,
  WOO_DB_DELETE_ERROR,
  WOO_DB_SEARCH_STATE,
  WOO_DB_SEARCH_STATE_ERROR,
  WOO_DB_SEARCH_TERM,
  WOO_DB_SEARCH_TERM_ERROR,
  WOO_DB_SEARCH_CLEAR,
  WOO_DB_SEARCH_CLEAR_ERROR,
  WOO_DB_DATA_READY,
  WOO_DB_DATA_READY_ERROR,
} from "../types";

const initialState = {
  googleSearch: [],
  googleSearched: null,
  wooDbAll: null,
  wooDbIn: null,
  wooDbOut: null,
  wooDbSearchState: null,
  wooDbSearchTerm: "",
  wooDbDataReady: false,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SEARCH:
      return {
        ...state,
        googleSearch: action.payload,
        loading: false,
      };
    case GOOGLE_SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GOOGLE_SEARCH_CLEAR:
      return {
        ...state,
        googleSearch: [],
        loading: false,
      };
    case GOOGLE_SEARCH_CLEAR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GOOGLE_SEARCH_SEARCHED:
      return {
        ...state,
        googleSearched: action.payload,
        loading: false,
      };
    case GOOGLE_SEARCH_SEARCHED_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_TO_WOO_DB_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_WOO_DB_ERROR:
      return {
        ...state,
        error: action.payload,
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
    case WOO_DB_ERROR:
      return {
        ...state,
        error: action.payload,
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
    case WOO_DB_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case WOO_DB_SEARCH_STATE:
      return {
        ...state,
        wooDbSearchState: action.payload,
      };
    case WOO_DB_SEARCH_STATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case WOO_DB_SEARCH_TERM:
      return {
        ...state,
        wooDbSearchTerm: action.payload,
      };
    case WOO_DB_SEARCH_TERM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case WOO_DB_DATA_READY:
      return {
        ...state,
        wooDbDataReady: action.payload,
        loading: false,
      };
    case WOO_DB_DATA_READY_ERROR:
      return {
        ...state,
        error: action.payload,
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
    case WOO_DB_SEARCH_CLEAR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
