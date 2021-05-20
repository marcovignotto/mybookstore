/**
 * @description Database section of the app
 * to handle the WooCommerce Books Database
 */

import React, { useState, useEffect, useLayoutEffect } from "react";

import { connect, useDispatch } from "react-redux";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  getWooDbAll,
  setWooDbState,
  setWooSearchTerm,
  setWooSearchClear,
  setWooDbDataReady,
} from "../store/actions/itemAction";

import { makeStyles } from "@material-ui/core/styles";

import BookItemDatabase from "../components/BookItemDatabase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  blocks: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  block1: {
    display: "flex",
    flexDirection: "column",
    width: 600,
    marginRight: 30,
    "& > *": {
      marginTop: 20,
    },
  },
  block2: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    "& > *": {
      marginTop: 20,
    },
  },
  allfilters: {
    display: "flex",
    flexDirection: "row",
  },
  clearbtn: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Database = ({
  dataAll,
  dataIn,
  dataOut,
  wooDbSeaState,
  wooDbSearchTerm,
  wooDbDataReady,
  loading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [dataToMap, setDataToMap] = useState(dataIn);

  const [inProgress, setInProgress] = useState(false);

  function sendWooDbDataReady(state) {
    new Promise((resolve, reject) => {
      // do anything here
      dispatch(setWooDbDataReady(state));
      resolve();
    });
  }

  useLayoutEffect(() => {
    let where = wooDbSeaState;

    if (!wooDbDataReady) {
      return;
    } else {
      if (where === "") {
        if (dataAll === null) {
          return;
        } else {
          setDataToMap(dataAll);
        }
      } else if (where === "stock_status=instock&") {
        if (dataIn === null) {
          return;
        } else {
          setDataToMap(dataIn);
        }
      } else if (where === "stock_status=outofstock&") {
        if (dataOut === null) {
          return;
        } else {
          setDataToMap(dataOut);
        }
      }
    }
    //eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (wooDbSeaState === null) {
      dispatch(setWooDbState("stock_status=instock&"));
    } else {
      return;
    }
    //eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (wooDbSeaState === "") {
      setDataToMap(dataAll);
    } else if (wooDbSeaState === "stock_status=instock&") {
      setDataToMap(dataIn);
    } else if (wooDbSeaState === "stock_status=outofstock&") {
      setDataToMap(dataOut);
    }
  }, [dataAll, dataIn, dataOut]);

  useLayoutEffect(() => {
    let where = wooDbSeaState;

    if (!wooDbDataReady) {
      return;
    } else {
      if (where === "") {
        if (dataAll === null) {
          searchIntoWooDb(wooDbSeaState, wooDbSearchTerm);
        } else {
          setDataToMap(dataAll);
          dispatch(setWooDbDataReady(true));
        }
      } else if (where === "stock_status=instock&") {
        if (dataIn === null) {
          searchIntoWooDb(wooDbSeaState, wooDbSearchTerm);
        } else {
          setDataToMap(dataIn);
          dispatch(setWooDbDataReady(true));
        }
      } else if (where === "stock_status=outofstock&") {
        if (dataOut === null) {
          searchIntoWooDb(wooDbSeaState, wooDbSearchTerm);
        } else {
          setDataToMap(dataOut);
          dispatch(setWooDbDataReady(true));
        }
      }
    }
  }, [wooDbSeaState]);

  const handleChangeTerms = (e) => {
    e.preventDefault();
    dispatch(setWooSearchTerm(e.target.value));
  };

  const handleChangeStock = (e, filter) => {
    let where = e.target.value;
    dispatch(setWooDbState(where));
  };

  const getDb = async (where, terms) => {
    let res = await dispatch(getWooDbAll(where, terms));
    return new Promise((resolve) => resolve(res));
  };

  const searchIntoWooDb = async (where, terms) => {
    setInProgress(true);
    const data = await getDb(where, terms);
    await setDataToMap(data);
    await dispatch(setWooDbDataReady(true));
    await setInProgress(false);
  };

  const clearWooDbSearch = () => {
    dispatch(setWooSearchClear());
    dispatch(setWooDbState("stock_status=instock&"));
    dispatch(setWooSearchTerm(""));
    dispatch(setWooDbDataReady(false));
  };

  const tableHead = (
    <>
      <div className="table-found">
        <div className="item1"></div>
        <div className="item2">Cover</div>
        <div className="item3">Title</div>
        <div className="item4">Author/s</div>
        <div className="item5">ISBN 13</div>
        <div className="item6">ISBN 10</div>
      </div>
    </>
  );
  console.log(wooDbSearchTerm);
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.blocks}>
          <div className={classes.block1}>
            <TextField
              id="terms"
              label="Title"
              variant="outlined"
              value={wooDbSearchTerm}
              onChange={handleChangeTerms}
              disabled={wooDbDataReady}
            />
            <Button
              variant="contained"
              onClick={() => searchIntoWooDb(wooDbSeaState, wooDbSearchTerm)}
              disabled={wooDbDataReady}
            >
              Search
            </Button>
          </div>
          <FormControl component="fieldset">
            <div className={classes.allfilters}>
              <div className={classes.dbselectors}>
                <FormLabel component="legend">Filter DB By</FormLabel>
                <RadioGroup
                  aria-label="filter"
                  name="filter"
                  value={wooDbSeaState}
                  onChange={handleChangeStock}
                >
                  <FormControlLabel value="" control={<Radio />} label="All" />
                  <FormControlLabel
                    value="stock_status=instock&"
                    control={<Radio />}
                    label="In Stock"
                  />
                  <FormControlLabel
                    value="stock_status=outofstock&"
                    control={<Radio />}
                    label="Out Of Stock"
                  />
                </RadioGroup>
              </div>
              <div className={classes.clearbtn}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.margin}
                  onClick={clearWooDbSearch}
                >
                  Clear search
                </Button>
              </div>
            </div>
          </FormControl>
        </div>
      </form>
      {wooDbDataReady ? tableHead : null}
      <div className="items-found">
        {loading || !wooDbDataReady ? (
          <>
            {inProgress && dataToMap === null ? (
              <div className="in-progress">
                <CircularProgress />
              </div>
            ) : (
              <div className="no-data">
                Type a book title or author(s) to search in the database
              </div>
            )}
          </>
        ) : (
          dataToMap.map((item) => (
            <BookItemDatabase item={item} key={item.id} />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataAll: state.items.wooDbAll,
  dataIn: state.items.wooDbIn,
  dataOut: state.items.wooDbOut,
  wooDbSeaState: state.items.wooDbSearchState,
  wooDbSearchTerm: state.items.wooDbSearchTerm,
  wooDbDataReady: state.items.wooDbDataReady,
  loading: state.items.loading,
});

export default connect(mapStateToProps, {
  getWooDbAll,
  setWooDbState,
  setWooSearchTerm,
  setWooSearchClear,
  setWooDbDataReady,
})(Database);
