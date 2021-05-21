/**
 * @description Insert section of the app
 * to search into Google Books APIs
 * and insert into WooCommerce
 */

import React, { Fragment, useState, useEffect } from "react";

import { useDispatch, connect } from "react-redux";

import {
  googleSearch,
  setGoogleSearchClear,
  setGoogleSearched,
} from "../store/actions/itemAction";

import BookItem from "./BookItem";

/**
 * @description MatUI
 */

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import FadeIn from "react-fade-in";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  // GRID GRID
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },

  // FORM

  inputs: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginRight: 30,
    "& > *": {
      marginTop: 20,
    },
  },
  titleauthor: {
    width: "50%",
    // width: 800,
    display: "flex",
    flexDirection: "column",
    "& > :first-child": {
      marginRight: 20,
    },
    "& > div": {
      width: 450,
      marginBottom: 20,
    },
    "& > :last-child": {
      marginRight: 0,
    },
  },
  isbn: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    // marginRight: "30px",
    "& > *": {
      // width: "40%",
      // marginBottom: 20,
    },
    "& > :first-child": {
      // marginRight: 20,
    },
  },

  // BUTTONS

  buttons: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: 20,
    "& > *": {
      width: 200,
      marginBottom: 20,
      // marginRight: 50,
      // marginLeft: 50,
    },
    "& > :last-child": {
      marginLeft: "2rem",
      // marginRight: 20,
    },
  },

  // Tables
  tableFound: {
    ...theme.tableFound,
    display: "grid", // Overrides default theme
  },
}));

const Insert = ({ data, loading, googleSearched }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [dataFound, setDataFound] = useState([]);
  const [noDatafound, setNoDatafound] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [disableIsbnText, setDisableIsbnText] = useState(false);
  const [disableTitleAuthorsText, setDisableTitleAuthorsText] = useState(false);

  const [searched, setSearched] = useState(false);

  function noDataTimeout() {
    setTimeout(() => {
      clearSearch();
    }, 3000);
  }

  useEffect(() => {
    if (data === undefined) {
      setDataFound([]);
      setNoDatafound(true);
      noDataTimeout();
    } else {
      setDataFound(data);
      setNoDatafound(false);
    }
  }, [data]);

  useEffect(() => {
    if (googleSearched === "title") {
      setDisableIsbnText(true);
      setSearched(true);
    } else if (googleSearched === "isbn") {
      setDisableTitleAuthorsText(true);
      setSearched(true);
    }
    //eslint-disable-next-line
  }, []);

  const [item, setItem] = useState({
    title: "",
    author: "",
    isbn: "",
  });

  const { title, author, isbn } = item;

  const onChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.id]: e.target.value });

    if (item.title || item.author) {
      setDisableIsbnText(true);
      dispatch(setGoogleSearched("title"));
    } else if (isbn) {
      setDisableTitleAuthorsText(true);
      dispatch(setGoogleSearched("isbn"));
    }
  };

  /**
   * @description Adds book to WooCommerce
   * @param {*} e
   */

  const onSubmit = (e) => {
    e.preventDefault();
    setInProgress(true);
    setItem(item);
    dispatch(googleSearch(item));
    setIsDataReady(true);
    setSearched(true);
  };

  /**
   * @description clear search once is over
   */
  const clearSearch = () => {
    setItem({
      title: "",
      author: "",
      isbn: "",
    });

    dispatch(setGoogleSearchClear());
    dispatch(setGoogleSearched());

    setDisableIsbnText(false);
    setDisableTitleAuthorsText(false);
    setSearched(false);
    setIsDataReady(false);
    setInProgress(false);
  };

  /**
   * @desc tablehead for books results
   */

  const tableHead = (
    <>
      <Grid container className={`table-found ${classes.tableFound}`}>
        <Grid item className="item1"></Grid>
        <Grid item className="item2">
          Cover
        </Grid>
        <Grid item className="item3">
          Title
        </Grid>
        <Grid item className="item4">
          Author/s
        </Grid>
        <Grid item className="item5">
          ISBN 13
        </Grid>
        <Grid item className="item6">
          ISBN 10
        </Grid>
      </Grid>
    </>
  );

  /**
   * @desc message for no results
   */

  const showNodata = (
    <div className="no-data">No books found, try another research</div>
  );

  return (
    <Fragment>
      <div id="book-search">
        <div className="items">
          {/* <Divider light /> */}

          <div className={classes.inputs}>
            {/* <Divider orientation="vertical" flexItem light /> */}

            <div
              className={classes.titleauthor}
              style={{ display: !disableTitleAuthorsText ? "flex" : "none" }}
            >
              <Typography variant="h4" color="primary" gutterBottom>
                Search for a book to insert
              </Typography>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={onChange}
                disabled={searched}
              />
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                value={author}
                onChange={onChange}
                disabled={searched}
              />
            </div>

            <Divider orientation="vertical" flexItem light />
            <div
              className={classes.isbn}
              style={{ display: !disableIsbnText ? "flex" : "none" }}
            >
              <div
                style={{ display: !disableTitleAuthorsText ? "flex" : "none" }}
              >
                <Typography variant="h4" color="secondary" gutterBottom>
                  or by ISBN
                </Typography>
              </div>
              <div
                style={{ display: disableTitleAuthorsText ? "flex" : "none" }}
              >
                <Typography variant="h4" color="secondary" gutterBottom>
                  Insert ISBN
                </Typography>
              </div>

              <TextField
                id="isbn"
                label="Search a book in the DB"
                variant="outlined"
                value={isbn}
                onChange={onChange}
                disabled={searched}
              />
            </div>
          </div>
          <Divider light />
          <div className={classes.buttons}>
            <Button variant="contained" onClick={onSubmit} disabled={searched}>
              Search
            </Button>
            <Button variant="contained" onClick={clearSearch}>
              Clear Search
            </Button>
          </div>
        </div>
      </div>
      {isDataReady ? tableHead : null}
      <div className="items-found">
        {loading ? (
          <>
            {inProgress ? (
              <div className="in-progress">
                <CircularProgress />
              </div>
            ) : (
              <div className="no-data">
                Type a book title or author(s) to search into the APIs
              </div>
            )}
          </>
        ) : (
          <FadeIn>
            {noDatafound
              ? showNodata
              : dataFound.map((item) => <BookItem item={item} key={item.id} />)}
          </FadeIn>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.items.googleSearch,
  googleSearched: state.items.googleSearched,
  loading: state.items.loading,
});

export default connect(mapStateToProps, {
  googleSearch,
  setGoogleSearchClear,
  setGoogleSearched,
})(Insert);
