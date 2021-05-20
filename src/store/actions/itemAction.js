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

import axios from "axios";

const API = process.env.REACT_APP_GOOGLE_BOOK_API;

const API_CONVERTER = process.env.REACT_APP_API_CONVERTER;

const WOO_CK = process.env.REACT_APP_WOO_CK;
const WOO_CS = process.env.REACT_APP_WOO_CS;

const RES = 20;

export const googleSearch = (entry) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (!entry.isbn) {
        //&langRestrict=it&maxResu...
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${entry.title}+inauthor:${entry.author}&maxResults=${RES}&key=${API}`,
          entry
        );
        await dispatch({ type: GOOGLE_SEARCH, payload: res.data.items });
        return res;
      } else if (entry.isbn) {
        console.log(entry.isbn);
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${entry.isbn}&maxResults=${RES}&key=${API}`,
          entry
        );
        console.log("isbn search", res.data.items);
        await dispatch({ type: GOOGLE_SEARCH, payload: res.data.items });
        return res;
      }
    } catch (error) {
      // dispatch({type: CONTACT_ERROR})
      console.log("error", error);
    }
  };
};

export const setGoogleSearchClear = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: GOOGLE_SEARCH_CLEAR });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const setGoogleSearched = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: GOOGLE_SEARCH_SEARCHED, payload: state });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addToWooDb = (info, isbn, item2, quantity, status, price) => {
  const dataImg = {
    Parameters: [
      {
        Name: "File",
        FileValue: {
          Url: `${info.imageLinks.thumbnail}`,
        },
      },
      {
        Name: "StoreFile",
        Value: true,
      },
      {
        Name: "WebHook",
        Value: `${info.imageLinks.thumbnail}`,
      },
    ],
  };

  return async (dispatch) => {
    const fetchData = async () => {
      const result = await axios.request({
        method: "post",
        url: `https://v2.convertapi.com/convert/webp/to/jpg?Secret=${API_CONVERTER}`,
        data: dataImg,
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
      return result;
    };
    fetchData()
      .then(function (results) {
        const data = {
          name: `${info.title}`,
          type: "simple",
          regular_price: `${price.price}`,
          description: `${info.description}`,
          short_description: `${info.authors}`,
          categories: [{ id: 9 }, { id: 14 }],
          manage_stock: true,
          stock_quantity: quantity.stock,
          images: [
            {
              src: results.data.Files[0].Url,
            },
          ],
          attributes: [
            {
              id: 4,
              name: "Book status",
              position: 0,
              visible: true,
              variation: false,
              options: status.status,
            },
          ],
          meta_data: [
            {
              id: 32,
              key: "_wpm_gtin_code",
              value: isbn,
            },
          ],
          ean_code: isbn,
        };

        // console.log("data", data);

        const dataJson = JSON.stringify(data);

        const config = {
          config: {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json;charset=utf-8",
            },
          },
          data: dataJson,
        };

        const resultReq = axios({
          method: "post",
          url: `https://www.ours-watches.com/mybookstore/wp-json/wc/v3/products?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
          data,
        });

        // console.log("res from items", resultReq);
        dispatch({ type: ADD_TO_WOO_DB, payload: resultReq });
        // return resultReq.then((x) => console.log("Done!"));
        return resultReq;
      })
      .then(function (res) {
        return res;
      })
      .catch((error) => console.log(error));
  };
};

export const updateWooDb = (id, newPrice, newStockQuantity, newBookStatus) => {
  const data = {
    regular_price: `${newPrice.price}`,
    stock_quantity: newStockQuantity.stock,
    attributes: [
      {
        id: 4,
        name: "Book status",
        position: 0,
        visible: true,
        variation: false,
        options: newBookStatus.status,
      },
    ],
  };

  const dataJson = JSON.stringify(data);

  const config = {
    config: {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      },
    },
    data: dataJson,
  };

  return async (dispatch) => {
    try {
      const resultReq = axios({
        method: "put",
        url: `https://www.ours-watches.com/mybookstore/wp-json/wc/v3/products/${id}?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        data,
      });

      return resultReq;

      // dispatch({ type: ADD_TO_WOO_DB, payload: resultReq.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteWooDb = (id) => {
  return async (dispatch) => {
    try {
      const resultReq = axios({
        method: "delete",
        url: `https://www.ours-watches.com/mybookstore/wp-json/wc/v3/products/${id}?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
      });

      setTimeout(() => {
        dispatch({ type: WOO_DB_DELETE_ALL, payload: id });
        dispatch({ type: WOO_DB_DELETE_IN, payload: id });
        dispatch({ type: WOO_DB_DELETE_OUT, payload: id });
      }, 2000);
      return resultReq;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getWooDbAll = (stock, searchTerms) => {
  if (searchTerms === null) {
    return async (dispatch) => {
      try {
        const res = await axios.request({
          method: "get",
          url: `https://www.ours-watches.com/mybookstore/wp-json/wc/v3/products?${stock}&per_page=100&consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        });

        if (stock === "") {
          await dispatch({ type: WOO_DB_ALL, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=instock&") {
          await dispatch({ type: WOO_DB_IN, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=outofstock&") {
          await dispatch({ type: WOO_DB_OUT, payload: res.data });
          return await res.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  } else {
    return async (dispatch) => {
      try {
        const res = await axios.request({
          method: "get",
          url: `https://www.ours-watches.com/mybookstore/wp-json/wc/v3/products?${stock}&search=${searchTerms}&per_page=100&consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        });

        if (stock === "") {
          await dispatch({ type: WOO_DB_ALL, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=instock&") {
          await dispatch({ type: WOO_DB_IN, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=outofstock&") {
          await dispatch({ type: WOO_DB_OUT, payload: res.data });
          return await res.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  }
};

export const setWooDbState = (state) => {
  // console.log(state);
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_STATE, payload: state });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const setWooSearchTerm = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_TERM, payload: state });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const setWooSearchClear = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_CLEAR });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const setWooDbDataReady = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_DATA_READY, payload: state });
    } catch (error) {
      console.log("error", error);
    }
  };
};