/**
 * @description Single Book Item for database
 */

import React, { useState, useEffect } from "react";

import { useDispatch, connect } from "react-redux";

import {
  addToWooDb,
  updateWooDb,
  deleteWooDb,
} from "../store/actions/itemAction";

import { colors, cardStyle, cardStyleAddDb } from "../styles/Theme";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";

import classNames from "classnames/bind";

/**
 * @desc MatUI
 */
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import { useTransition, animated } from "@react-spring/web";

import {
  transitions,
  transitionsCompressed,
  transitionsExpand,
  transitionsDelete,
} from "../animations/animations";

const useStyles = makeStyles((theme) => ({
  btnUpdateItem: {
    ...theme.buttons.btnUpdateItem,
  },
}));

const BookItemDatabase = ({ item, data, loading, wooDbSearchState }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    id,
    price,
    meta_data,
    name, // Title
    stock_quantity,
    short_description, // Authors
    stock_status,
  } = item;

  const cover = item?.images[0].src;
  const status = item?.attributes[0].options[0];
  const ean_code = item?.attributes;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteBtns, setShowDeleteBtns] = useState(true);

  const [itemIsUpdated, setItemIsUpdated] = useState(false);

  const [addToStore, setAddToStore] = useState(false);
  const [codes, setCodes] = useState([]);

  const [newPrice, setNewPrice] = useState({ price: price });
  const [newStockQuantity, setNewStockQuantity] = useState({
    stock: stock_quantity,
  });
  const [newBookStatus, setNewBookStatus] = useState({ status: status });

  const [stockStatus, setStockStatus] = useState(stock_status);

  const [itemIsDeleted, setItemIsDeleted] = useState(false);

  const itemClass = classNames({
    "items-table": !addToStore,
    "items-table-selected": addToStore,
    "items-table-out-of-stock": stockStatus === "outofstock",
  });

  useEffect(() => {
    if (ean_code === undefined) {
      return null;
    }
    setCodes(ean_code);
    //eslint-disable-next-line
  }, []);

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

  const handleBookPrice = (e) => {
    setNewPrice({ [e.target.name]: e.target.value });
  };

  const handleBookQuantity = (e) => {
    setNewStockQuantity({ [e.target.name]: e.target.value });
  };

  const handleBookStatus = (e) => {
    setNewBookStatus({ [e.target.name]: e.target.value });
  };

  const sendUpdate = () => {
    const data = dispatch(
      updateWooDb(id, newPrice, newStockQuantity, newBookStatus, codes)
    );

    data.then(function (res) {
      if (res >= 200 && res <= 399) {
        setItemIsUpdated(true);
        setShowDeleteBtns((prev) => !prev);
      } else {
        setItemIsUpdated(false);
        setShowDeleteBtns((prev) => !prev);
      }
    });
    setTimeout(() => {
      setItemIsUpdated((prev) => !prev);
      setShowDeleteBtns((prev) => !prev);
    }, 3000);
  };

  const handleDeleteConfirm = (event) => {
    setShowDeleteConfirm(event.currentTarget);
    setShowDeleteBtns((prev) => !prev);
  };

  const handleCloseConfirm = () => {
    setShowDeleteConfirm(false);
    setShowDeleteBtns((prev) => !prev);
  };

  const deleteItem = () => {
    const data = dispatch(deleteWooDb(id));
    data.then(function (res) {
      if (res >= 200 && res <= 399) {
        setItemIsDeleted(true);
        setShowDeleteConfirm(false);
      } else {
        setItemIsDeleted(false);
        setShowDeleteConfirm(false);
      }
    });
  };

  /**
   * @desc Upd btn and delete icon
   */

  const updateAndDelete = (
    <>
      <div className="upd-delete">
        <Button
          className={`btn-upd-item ${classes.btnUpdateItem}`}
          onClick={() => {
            sendUpdate();
          }}
        >
          Update item
        </Button>
        <IconButton
          className="btn-icon-delete"
          aria-label="delete"
          onClick={handleDeleteConfirm}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
  /**
   * @desc Confirmation message
   */
  const confirmation = (
    <div className="confirmation">
      <div>Are you sure?</div>
      <div className="confirm-buttons">
        <button
          className="btn-confirm-yes"
          onClick={() => {
            deleteItem();
          }}
        >
          Yes
        </button>
        <button
          className="btn-confirm-no"
          onClick={() => {
            handleCloseConfirm();
          }}
        >
          No
        </button>
      </div>
    </div>
  );

  /**
   * @desc upd/del messages
   */
  const bookDeleted = (
    <div className="upd-delete">
      <div className={`book-delete ${classes.btnAddDb}`}>
        <div>Book Deleted</div>
      </div>
    </div>
  );

  const bookUpdated = (
    <div className="upd-delete">
      <div className={`book-delete ${classes.btnAddDb}`}>
        <div>Book Updated</div>
      </div>
    </div>
  );

  /**
   * @desc Animations with react spring
   */

  const [showAddToStore, setShowAddToStore] = useState(false);

  const [showDetailedItem, setShowDetailedItem] = useState(false);

  const [showCompressedItem, setShowCompressedItem] = useState(true);

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

  const transitionsDeleteAni = useTransition(!itemIsDeleted, {
    ...transitionsDelete,
  });

  /**
   * @desc emoves <p> and </p> taken from WooCommerce
   */
  let authorsString = short_description.substring(
    3,
    short_description.search("</p>")
  );

  /**
   * @desc obj to fill with codes
   */
  const objCodes = {
    isbn_10: "",
    isbn_13: "",
    other: "",
  };

  /**
   * @desc renders the item when compressed
   */

  const compressedItem = transitionsCompressedAni(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            className={itemClass}
            onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
          >
            <div className="item1">
              {!addToStore ? (
                <button onClick={clickAddToStore} className="btn-add">
                  <i className="fas fa-plus"></i>
                </button>
              ) : (
                <button onClick={clickRemoveFromStore} className="btn-add">
                  <i className="fas fa-minus"></i>
                </button>
              )}
            </div>
            <div
              className="item2"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              <img src={cover} alt="" />
            </div>
            <div
              className="item3"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && name.length > 59
                ? name.substring(0, 60) + "..."
                : name}
            </div>
            <div
              className="item4"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && authorsString.length > 85
                ? authorsString.substring(0, 86) + "..."
                : authorsString}
            </div>
            {/* START Indentifiers ISBN_10 / ISBN_13 / OTHER */}
            {Array.isArray(ean_code) && codes.length === 0
              ? null
              : codes.map((item) => {
                  /**
                   * @desc fills the obj
                   */
                  if (item.name === "OTHER") objCodes.other = item.options[0];
                  if (item.name === "ISBN 10")
                    objCodes.isbn10 = item.options[0];
                  if (item.name === "ISBN 13")
                    objCodes.isbn13 = item.options[0];

                  if (objCodes.other !== "Not provided") {
                    return (
                      <>
                        <div
                          style={{ textAlign: "center" }}
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {objCodes.other}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          key={
                            objCodes.isbn13.length === 0
                              ? Math.floor(Math.random() * 100000)
                              : objCodes.isbn13
                          }
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 13: " : null}
                          {objCodes.isbn13.length === 0
                            ? null
                            : objCodes.isbn13}
                        </div>
                        <div
                          key={objCodes.isbn10}
                          item
                          className="item6"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 10: " : null}
                          {objCodes.isbn10.length === 0
                            ? null
                            : objCodes.isbn10}
                          {stockStatus === "instock" ? (
                            ""
                          ) : (
                            <div className="text-out-of-stock">
                              OUT OF STOCK
                            </div>
                          )}
                        </div>
                      </>
                    );
                  }
                })}

            {/* END Indentifiers ISBN_10 / ISBN_13 / OTHER */}
          </div>
        </animated.div>
      )
  );

  /**
   * @desc renders the item when expanded
   */

  const detailedItem = transitionsExpandAni(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            className={itemClass}
            onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
          >
            <div className="item1">
              {!addToStore ? (
                <button onClick={clickAddToStore} className="btn-add">
                  <i className="fas fa-plus"></i>
                </button>
              ) : (
                <button onClick={clickRemoveFromStore} className="btn-add">
                  <i className="fas fa-minus"></i>
                </button>
              )}
            </div>
            <div
              className="item2"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              <img src={cover} alt="" />
            </div>
            <div
              className="item3"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {!addToStore && name.length > 59
                ? name.substring(0, 60) + "..."
                : name}
            </div>
            <div
              className="item4"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {/* Removed <p> and </p> taken from WooCommerce */}
              {!addToStore && authorsString.length > 85
                ? authorsString.substring(0, 86) + "..."
                : authorsString}
            </div>
            {/* START Indentifiers ISBN_10 / ISBN_13 / OTHER */}
            {Array.isArray(ean_code) && codes.length === 0
              ? null
              : codes.map((item) => {
                  /**
                   * @desc fills the obj
                   */
                  if (item.name === "OTHER") objCodes.other = item.options[0];
                  if (item.name === "ISBN 10")
                    objCodes.isbn10 = item.options[0];
                  if (item.name === "ISBN 13")
                    objCodes.isbn13 = item.options[0];

                  if (objCodes.other !== "Not provided") {
                    return (
                      <>
                        <div
                          style={{ textAlign: "center" }}
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {objCodes.other}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          key={
                            objCodes.isbn13.length === 0
                              ? Math.floor(Math.random() * 100000)
                              : objCodes.isbn13
                          }
                          item
                          className="item5"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 13: " : null}
                          {objCodes.isbn13.length === 0
                            ? null
                            : objCodes.isbn13}
                        </div>
                        <div
                          key={objCodes.isbn10}
                          item
                          className="item6"
                          onClick={
                            !addToStore ? clickAddToStore : clickRemoveFromStore
                          }
                        >
                          {addToStore ? "ISBN 10: " : null}
                          {objCodes.isbn10.length === 0
                            ? null
                            : objCodes.isbn10}
                          {stockStatus === "instock" ? (
                            ""
                          ) : (
                            <div className="text-out-of-stock">
                              OUT OF STOCK
                            </div>
                          )}
                        </div>
                      </>
                    );
                  }
                })}

            {/* END Indentifiers ISBN_10 / ISBN_13 / OTHER */}
          </div>
        </animated.div>
      )
  );

  /**
   * @desc transitionsDelete to animate it on delete
   * @uses itemIsDeleted
   */

  return transitionsDeleteAni(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div className="book-item">
            {addToStore ? detailedItem : compressedItem}
            {!addToStore
              ? ""
              : transitionsAni(
                  (styles, item) =>
                    item && (
                      <animated.div style={styles}>
                        <Grid className="add-to-store" style={cardStyleAddDb}>
                          <div className="add-to-store-inputs">
                            <Divider orientation="vertical" flexItem light />
                            <label>€:</label>
                            <input
                              className="input-price"
                              type="number"
                              name="price"
                              value={price.price}
                              defaultValue={newPrice.price}
                              placeholder={newPrice.price}
                              onChange={handleBookPrice}
                            />
                            <label>Qnt:</label>
                            <input
                              className="input-stock"
                              type="number"
                              name="stock"
                              value={stock_quantity.quantity}
                              defaultValue={newStockQuantity.stock}
                              placeholder={newStockQuantity.stock}
                              onChange={handleBookQuantity}
                            />{" "}
                            <label>Status:</label>
                            <form>
                              <select
                                className="input-status"
                                id="status"
                                name="status"
                                onChange={handleBookStatus}
                                value={status.books}
                                defaultValue={newBookStatus.status}
                              >
                                <option value="Crap">Crap</option>
                                <option value="Good">Good</option>
                                <option value="like-new">Like New</option>
                              </select>
                            </form>
                            <Divider orientation="vertical" flexItem light />
                            {showDeleteBtns && !itemIsDeleted && !itemIsUpdated
                              ? updateAndDelete
                              : null}
                            {!showDeleteBtns && showDeleteConfirm
                              ? confirmation
                              : null}
                            {itemIsDeleted && !itemIsUpdated
                              ? bookDeleted
                              : null}
                            {itemIsUpdated ? bookUpdated : null}
                          </div>
                        </Grid>
                      </animated.div>
                    )
                )}
          </div>
        </animated.div>
      )
  );
};

const mapStateToProps = (state) => ({
  data: state.items,
  wooDbSearchState: state.wooDbSearchState,
  loading: state.items.loading,
});

export default connect(mapStateToProps, {
  addToWooDb,
  updateWooDb,
  deleteWooDb,
})(BookItemDatabase);
