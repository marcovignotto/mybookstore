/**
 * @description Single Book Item for insert
 */

import React, { useState, useEffect } from "react";

import { useDispatch, connect } from "react-redux";

import { addToWooDb } from "../store/actions/itemAction";

import { MakeQuerablePromise } from "../utils/convertPromises";
import { createKeyframeAnimation } from "../utils/cardCollapse";

import noImage from "../images/no-image.jpg";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { colors, cardStyle, cardStyleAddDb } from "../styles/Theme";

import { makeStyles } from "@material-ui/core/styles";

import FadeIn from "react-fade-in";

// new MAT UI import

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// End new MAT UI

// collapse MAT UI
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
// import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Check } from "@material-ui/icons";
// end collapse MAT UI

const useStyles = makeStyles((theme) => ({
  btnAddDb: {
    ...theme.buttons.btnAddDb,
  },
  bookData: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "& > *": {
      margin: 0,
    },
  },
  bookAdd: {},
}));

function getSize() {
  var table = document.getElementsByClassName("items-table");
  return {
    heightCollapsed: table[0].offsetHeight,
    width: table[0].offsetWidth,
  };
}
function getSizeOpen() {
  var selected = document.getElementsByClassName("items-table-selected");
  var addStore = document.getElementsByClassName("add-to-store");

  return {
    heightExpanded: selected[0].offsetHeight + addStore[0].offsetHeight,
  };
}

const BookItem = ({ item, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [imgSrc, setImgSrc] = useState(undefined);
  const [identifiers, setIdentifiers] = useState([]);
  const [isbnToSend, setIsbnToSend] = useState();

  const [thumbAdd, setThumbAdd] = useState();
  const [stockQuantity, setStockQuantity] = useState({ stock: 1 });
  const [price, setPrice] = useState({ price: 10 });
  const [bookStatus, setBookStatus] = useState({ status: "good" });
  const [addToStore, setAddToStore] = useState(false);

  const [menuAnimation, setMenuAnimation] = useState();

  const [menuContentsAnimation, setMenuContentsAnimation] = useState();

  const [areIdentifiersReady, setIsIdentifiersReady] = useState(false);

  const styleAnimation = {
    animationName: menuAnimation,
    animationDuration: "0.2s",
    animationTimingFunction: "linear",
  };

  const styleContentsAnimation = {
    animationName: menuContentsAnimation,
    animationDuration: "0.2s",
    animationTimingFunction: "linear",
  };

  const [cardSizes, setCardSizes] = useState({
    width: "",
    heightCollapsed: "",
    heightExpanded: "",
  });

  useEffect(() => {
    getSize();
    setCardSizes({
      ...cardSizes,
      width: getSize().width,
      heightCollapsed: getSize().heightCollapsed,
    });

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (addToStore) {
      getSizeOpen();
      setCardSizes({
        ...cardSizes,
        heightExpanded: getSizeOpen().heightExpanded,
      });

      const animations = createKeyframeAnimation(
        cardSizes.heightCollapsed,
        getSizeOpen().heightExpanded,
        cardSizes.width
      );

      setMenuAnimation(animations.menuAnimation);
      setMenuContentsAnimation(animations.menuContentsAnimation);
    } else {
      return;
    }
  }, [addToStore]);

  /**
   * @desc set indentifiers
   */
  useEffect(() => {
    if (item.volumeInfo.industryIdentifiers === undefined) {
      setIdentifiers(["00000000000"]);
      setIsbnToSend(["00000000000"]);
      setIsIdentifiersReady(true);
    } else {
      async function mapIndentifiers() {
        const mapIden = await item.volumeInfo.industryIdentifiers.map(
          (item) => {
            return item;
          }
        );

        await setIdentifiers(mapIden);
        const res = await mapIden.map((item) => setIsbnToSend(mapIden));
        setIsIdentifiersReady(true);
        return res;
      }
      mapIndentifiers();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      item.volumeInfo.imageLinks === undefined ||
      item.volumeInfo.imageLinks.thumbnail === undefined
    ) {
      setImgSrc(noImage);
    } else {
      setImgSrc(item.volumeInfo.imageLinks.thumbnail);
    }
    // eslint - disable - next - line;
  }, []);

  const bookQuantity = (e) => {
    setStockQuantity({ ...stockQuantity, [e.target.name]: e.target.value });
  };

  const bookPrice = (e) => {
    setPrice({ ...price, [e.target.name]: e.target.value });
  };

  const changeBookStatus = (e) => {
    setBookStatus({ ...bookStatus, [e.target.name]: e.target.value });
  };

  const clickAddToStore = () => {
    setAddToStore(true);
  };
  const clickRemoveFromStore = () => {
    setAddToStore(false);
  };

  const [isItemAdded, setIsItemAdded] = useState(false);

  const addToDb = () => {
    const data = dispatch(
      addToWooDb(
        item.volumeInfo,
        isbnToSend,
        item.searchInfo,
        stockQuantity,
        bookStatus,
        price
      )
    );
    const result = MakeQuerablePromise(data);
    result.then(function () {
      setIsItemAdded(result.isFulfilled()); //true
    });
  };

  const addItem = (
    <>
      <Button
        className={classes.btnAddDb}
        onClick={() => {
          addToDb();
        }}
      >
        Add to DB
      </Button>
    </>
  );

  const itemAdded = (
    <>
      <div className="item-added">
        <div>Book Added</div>
      </div>
    </>
  );

  // console.log(identifiers.length);
  // useEffect(() => {
  //   // console.log(identifiers === undefined);
  //   identifiers.map((item) => {
  //     if (item.identifier?.search(":") === -1) {
  //       return item.identifier;
  //     } else {
  //       console.log(
  //         item.identifier?.substring(item.identifier.search(":") + 1)
  //       );
  //       return item.identifier?.substring(item.identifier.search(":") + 1);
  //     }
  //   });
  // }, [identifiers]);

  // key={extractIdentifier(item.identifier)}

  const extractIdentifier = (id) => {
    // console.log(id);
    if (id.search(":") === -1) {
      return id;
    } else {
      return id.substring(id.search(":") + 1);
    }
  };

  // console.log(identifiers.length);
  // console.log("item.volumeInfo.authors", item.volumeInfo.authors.join(", "));
  return (
    <>
      {/* to start waits loading from reducer */}
      {loading ? null : (
        <Grid container className="book-item">
          <Grid
            container
            className={!addToStore ? "items-table" : "items-table-selected"}
            style={(cardStyle, styleAnimation, styleContentsAnimation)}
            onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
          >
            <Grid item className="item1">
              {!addToStore ? (
                <button onClick={clickAddToStore} className="btn-add">
                  <i className="fas fa-plus"></i>
                </button>
              ) : (
                <button onClick={clickRemoveFromStore} className="btn-add">
                  <i className="fas fa-minus"></i>
                </button>
              )}
            </Grid>
            <Grid
              item
              className="item2"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              <img src={imgSrc} alt="" />
            </Grid>
            <Grid
              item
              className="item3"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && item.volumeInfo.title.length > 59
                ? item.volumeInfo.title.substring(0, 60) + "..."
                : item.volumeInfo.title}
            </Grid>
            <Grid
              item
              className="item4"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {item.volumeInfo.authors === undefined
                ? ""
                : !addToStore && item.volumeInfo.authors.join(", ").length > 59
                ? item.volumeInfo.authors.join(", ").substring(0, 60) + "..."
                : item.volumeInfo.authors.join(", ")}
            </Grid>
            {/* START Indentifiers ISBN_10 / ISBN_13 / OTHER */}
            {identifiers.length === 0
              ? null
              : identifiers.map((item) => {
                  let other = "";
                  let isbn10 = "";
                  let isbn13 = "";
                  if (item.type === "OTHER") other = item.identifier;
                  if (item.type === "ISBN_10") isbn10 = item.identifier;
                  if (item.type === "ISBN_13") isbn13 = item.identifier;

                  if (other.length > 0) {
                    return (
                      <>
                        <Grid
                          style={{ textAlign: "center" }}
                          key={extractIdentifier(other)}
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {other}
                        </Grid>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Grid
                          key={
                            isbn13.length === 0
                              ? Math.floor(Math.random() * 100000)
                              : isbn13
                          }
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 13: " : null}
                          {isbn13.length === 0 ? null : isbn13}
                        </Grid>
                        <Grid
                          key={isbn10}
                          item
                          className="item6"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 10: " : null}
                          {isbn10.length === 0 ? null : isbn10}
                        </Grid>
                      </>
                    );
                  }
                })}

            {/* END Indentifiers ISBN_10 / ISBN_13 / OTHER */}
          </Grid>

          {!addToStore ? (
            ""
          ) : (
            <Grid container className="add-to-store" style={cardStyleAddDb}>
              <Grid item className="item1"></Grid>
              <Grid item className="item2"></Grid>
              <Grid item className="item3">
                <input
                  className="input-price"
                  type="number"
                  name="price"
                  value={price.price}
                  placeholder="10"
                  onChange={bookPrice}
                />
                €
              </Grid>
              <Grid item className="item4">
                <input
                  className="input-stock"
                  type="number"
                  name="stock"
                  value={stockQuantity.books}
                  defaultValue="1"
                  onChange={bookQuantity}
                />
              </Grid>
              <Grid item className="item5">
                <form>
                  <select
                    className="input-status"
                    id="status"
                    name="status"
                    onChange={changeBookStatus}
                    value={bookStatus.status}
                  >
                    <option value="crap">Crap</option>
                    <option value="good">Good</option>
                    <option value="like-new">Like New</option>
                  </select>
                </form>
              </Grid>

              <Grid item className="item6">
                {isItemAdded ? itemAdded : addItem}
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.items.loading,
});

export default connect(mapStateToProps, { addToWooDb })(BookItem);
