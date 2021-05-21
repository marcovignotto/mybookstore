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
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import FadeIn from "react-fade-in";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
    marginRight: "30px",
    "& > :first-child": {
      marginRight: 20,
    },
    "& > div": {
      width: "100%",
      paddingRight: 30,
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
      width: "100%",
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
    justifyContent: "center",
    height: 60,
    marginTop: 20,
    "& > *": {
      width: 200,
      marginBottom: 20,
      marginRight: 50,
      marginLeft: 50,
    },
    "& > :last-child": {
      // marginLeft: "2rem",
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

  const [results, setResults] = useState(20);

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
    results: "",
  });

  const { title, author, isbn } = item;

  /**
   * @desc sets the kind of search
   * and controlls the opacity and the status of the inputs
   * @param {*} e
   */

  const onChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.id]: e.target.value, results: results });

    if (item.title || item.author) {
      setDisableIsbnText(true);
      dispatch(setGoogleSearched("title"));
    } else if (isbn) {
      setDisableTitleAuthorsText(true);
      dispatch(setGoogleSearched("isbn"));
    }
  };

  const handleChangeResults = (event) => {
    setResults(event.target.value);
  };

  const itemsToDisplay = [
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 30,
      label: 30,
    },
    {
      value: 40,
      label: 40,
    },
  ];

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
              style={{ opacity: !disableTitleAuthorsText ? 1 : 0.5 }}
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
                disabled={searched || disableTitleAuthorsText}
              />
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                value={author}
                onChange={onChange}
                disabled={searched || disableTitleAuthorsText}
              />
            </div>

            <Divider orientation="vertical" flexItem light />
            <div
              className={classes.isbn}
              style={{ opacity: !disableIsbnText ? 1 : 0.5 }}
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
                disabled={searched || disableIsbnText}
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
            <TextField
              id="standard-select-results"
              select
              // label="Select"
              value={results}
              onChange={handleChangeResults}
              helperText="Max items to display"
            >
              {itemsToDisplay.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
