/**
 * @description Single Book Item for insert
 */

import React, { useState, useEffect } from "react";

import { useDispatch, connect } from "react-redux";

import { addToWooDb } from "../store/actions/itemAction";

import { MakeQuerablePromise } from "../utils/convertPromises";

import noImage from "../images/no-image.jpg";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { cardStyle, cardStyleAddDb } from "../styles/Theme";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import { useTransition, animated } from "@react-spring/web";

import {
  transitions,
  transitionsCompressed,
  transitionsExpand,
} from "../animations/animations";

const useStyles = makeStyles((theme) => ({
  btnAddDb: {
    ...theme.buttons.btnAddDb,
  },
}));

const BookItem = ({ item, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [imgSrc, setImgSrc] = useState(undefined);
  const [identifiers, setIdentifiers] = useState([]);
  const [isbnToSend, setIsbnToSend] = useState();

  const [stockQuantity, setStockQuantity] = useState({ stock: 1 });
  const [price, setPrice] = useState({ price: 10 });
  const [bookStatus, setBookStatus] = useState({ status: "good" });
  const [addToStore, setAddToStore] = useState(false);

  const [areIdentifiersReady, setIsIdentifiersReady] = useState(false);

  /**
   * @desc states for animations with react spring
   */
  const [showAddToStore, setShowAddToStore] = useState(false);

  const [showDetailedItem, setShowDetailedItem] = useState(false);

  const [showCompressedItem, setShowCompressedItem] = useState(true);

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
    setShowDetailedItem(true);
    setShowCompressedItem(false);
  };
  const clickRemoveFromStore = () => {
    setAddToStore(false);
    setShowDetailedItem(false);
    setShowCompressedItem(true);
  };

  const [isItemAdded, setIsItemAdded] = useState(false);
  const [isItemNotAdded, setIsItemNotAdded] = useState(false);

  /**
   * @desc dispatches data and wait for the confirmation
   */
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

    /**
     * @desc converts promise in true/false
     */
    const result = MakeQuerablePromise(data);

    /**
     * @desc shows if is added or not
     */
    result.then(function () {
      if (result.isFulfilled()) return setIsItemAdded(true); //true
      if (!result.isFulfilled()) return setIsItemNotAdded(true); //false
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
      <div className={`item-added ${classes.btnAddDb}`}>
        <div>Book Added</div>
      </div>
    </>
  );

  const itemNotAdded = (
    <>
      <div className={`item-added ${classes.btnAddDb}`}>
        <div>Book not added</div>
      </div>
    </>
  );

  const extractIdentifier = (id) => {
    if (id.search(":") === -1) {
      return id;
    } else {
      return id.substring(id.search(":") + 1);
    }
  };

  /**
   * @desc Animations with react spring
   */

  const transitionsAni = useTransition(showAddToStore, {
    ...transitions,
  });

  const transitionsExpandAni = useTransition(showDetailedItem, {
    ...transitionsExpand,
    onDestroyed: () => setShowAddToStore((showAddToStore) => !showAddToStore),
  });

  const transitionsCompressedAni = useTransition(showCompressedItem, {
    ...transitionsCompressed,
  });

  /**
   * @desc renders the item when compressed
   */
  const compressedItem = transitionsCompressedAni(
    (styles, itemAni) =>
      itemAni && (
        <animated.div style={styles}>
          <Grid
            className={"items-table"}
            style={cardStyle}
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
              className="item2"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              <img src={imgSrc} alt="" />
            </Grid>
            <Grid
              className="item3"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && item.volumeInfo.title.length > 59
                ? item.volumeInfo.title.substring(0, 60) + "..."
                : item.volumeInfo.title}
            </Grid>
            <Grid
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
        </animated.div>
      )
  );

  /**
   * @desc renders the item when expanded
   */

  const detailedItem = transitionsExpandAni(
    (styles, itemAni) =>
      itemAni && (
        <animated.div style={styles}>
          <Grid
            container
            className={"items-table-selected"}
            style={cardStyle}
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
              className="item2"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              <img src={imgSrc} alt="" />
            </Grid>
            <Grid
              className="item3"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && item.volumeInfo.title.length > 59
                ? item.volumeInfo.title.substring(0, 60) + "..."
                : item.volumeInfo.title}
            </Grid>
            <Grid
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
        </animated.div>
      )
  );

  return (
    <>
      {/* to start waits loading from reducer */}
      {!loading ? null : (
        <div className="book-item">
          {addToStore ? detailedItem : compressedItem}

          {!addToStore
            ? ""
            : transitionsAni(
                (styles, itemAni) =>
                  itemAni && (
                    <animated.div style={styles}>
                      <Grid
                        container
                        className="add-to-store"
                        style={cardStyleAddDb}
                      >
                        <div className="add-to-store-inputs">
                          <Divider orientation="vertical" flexItem light />
                          <label>€:</label>
                          <input
                            className="input-price"
                            type="number"
                            name="price"
                            value={price.price}
                            placeholder="10"
                            onChange={bookPrice}
                          />

                          <Divider orientation="vertical" flexItem light />
                          <label>Qnt:</label>
                          <input
                            className="input-stock"
                            type="number"
                            name="stock"
                            value={stockQuantity.books}
                            defaultValue="1"
                            onChange={bookQuantity}
                          />
                          <Divider orientation="vertical" flexItem light />
                          <label>Status:</label>
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
                          <Divider orientation="vertical" flexItem light />
                          {isItemAdded
                            ? itemAdded
                            : isItemNotAdded
                            ? itemNotAdded
                            : addItem}
                        </div>
                      </Grid>
                    </animated.div>
                  )
              )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.items.loading,
});

export default connect(mapStateToProps, { addToWooDb })(BookItem);
