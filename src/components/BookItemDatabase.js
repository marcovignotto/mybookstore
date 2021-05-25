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

import classNames from "classnames/bind";

/**
 * @desc converts Promises in true/false
 */
import { MakeQuerablePromise } from "../utils/convertPromises";

/**
 * @desc MatUI
 */
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import {
  useTransition,
  animated,
  AnimatedProps,
  config,
} from "@react-spring/web";

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
    ean_code,
    name,
    stock_quantity,
    short_description,
    stock_status,
  } = item;

  const cover = item?.images[0].src;
  const status = item?.attributes[0].options[0];

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteBtns, setShowDeleteBtns] = useState(true);

  const [itemIsUpdated, setItemIsUpdated] = useState(false);

  const [addToStore, setAddToStore] = useState(false);
  const [codes, setCodes] = useState(["No codes Found"]);

  const [newPrice, setNewPrice] = useState({ price: price });
  const [newStockQuantity, setNewStockQuantity] = useState({
    stock: stock_quantity,
  });
  const [newBookStatus, setNewBookStatus] = useState({ status: status });

  const [stockStatus, setStockStatus] = useState(stock_status);

  const [itemIsDeleted, setItemIsDeleted] = useState(false);

  const [showEditItem, setShowEditItem] = useState(false);

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
    setShowAnimation(true);
    setShowDetailedItem(true);
    setShowDetailedItem(true);
    setShowCompressedItem(false);
  };
  const clickRemoveFromStore = () => {
    setAddToStore(false);
    setShowAnimation(false);
    setShowDetailedItem(false);
    setShowCompressedItem(true);
    // setShowEditItem(false);
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
      updateWooDb(id, newPrice, newStockQuantity, newBookStatus)
    );
    const result = MakeQuerablePromise(data);
    result.then(function () {
      setItemIsDeleted(result.isFulfilled());
    });

    setItemIsUpdated((prev) => !prev);
    setShowDeleteBtns((prev) => !prev);
    setTimeout(() => {
      setItemIsUpdated((prev) => !prev);
      setItemIsDeleted((prev) => !prev);
      setShowDeleteBtns((prev) => !prev);
    }, 2000);
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

    const result = MakeQuerablePromise(data);
    result.then(function () {
      setItemIsDeleted(result.isFulfilled());
    });
    setShowDeleteConfirm(false);
  };

  const updateAndDelete = (
    <>
      <Button
        className={classes.btnUpdateItem}
        onClick={() => {
          sendUpdate();
        }}
      >
        Update item
      </Button>
      <IconButton aria-label="delete" onClick={handleDeleteConfirm}>
        <DeleteIcon />
      </IconButton>
    </>
  );

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

  const bookDeleted = (
    <div className="book-delete">
      <div>Book Deleted</div>
    </div>
  );

  const bookUpdated = (
    <div className="book-delete">
      <div>Book Updated</div>
    </div>
  );

  const [showAnimation, setShowAnimation] = useState(false);

  const [showDetailedItem, setShowDetailedItem] = useState(false);

  const [showCompressedItem, setShowCompressedItem] = useState(true);

  const transitions = useTransition(showAnimation, {
    // default: { immediate: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    // reverse: show,
    delay: 1400,
    // config: config.molasses,
    config: { duration: 400 },
    // onStart: () => set(!show),
    // onChange: () => set(!show),
    onStart: () => console.log("start"),
  });

  const transitionsExpand = useTransition(showDetailedItem, {
    // default: { immediate: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    // reverse: show,
    delay: 0,
    // config: config.molasses,
    config: { duration: 400 },
    // onStart: () => set(!show),
    // onChange: () => set(!show),
    onStart: () => setShowEditItem(true),
  });

  const transitionsCompressed = useTransition(showCompressedItem, {
    // default: { immediate: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    // reverse: show,
    delay: 0,
    // config: config.molasses,
    config: { duration: 800 },
    // onStart: () => set(!show),
    // onChange: () => set(!show),
    onStart: () => setShowEditItem(true),
  });

  // return transitions(
  //   (styles, item) => item && <animated.div style={styles}>✌️</animated.div>
  // );
  // const [index, set] = useState(0);
  // const transitions = useTransition(index, {
  //   keys: null,
  //   from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  //   enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  //   leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  // });

  //   const itemClass = classNames({
  //   "items-table": !addToStore,
  //   "items-table-selected": addToStore,
  //   "items-table-out-of-stock": stockStatus === "outofstock",
  // });

  /**
   * @desc renders the item when compressed
   */

  const compressedItem = transitionsCompressed(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            style={cardStyle}
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
              {name}
            </div>
            <div
              className="item4"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {short_description}
            </div>
            <div
              className="item5"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              ----
            </div>
            <div
              className="item6"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {Array.isArray(ean_code) ? (
                codes.map((item) => {
                  return (
                    <div>
                      {item.type} : {item.identifier}
                    </div>
                  );
                })
              ) : (
                <div>{codes}</div>
              )}

              {stockStatus === "instock" ? (
                ""
              ) : (
                <div className="text-out-of-stock">OUT OF STOCK</div>
              )}
            </div>
          </div>
        </animated.div>
      )
  );

  /**
   * @desc renders the item when expanded
   */

  const detailedItem = transitionsExpand(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            style={cardStyle}
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
              {name}
            </div>
            <div
              className="item4"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              {short_description}
            </div>
            <div
              className="item5"
              onClick={!addToStore ? clickAddToStore : clickRemoveFromStore}
            >
              ----
            </div>
          </div>
        </animated.div>
      )
  );

  return (
    <div className="book-item">
      {addToStore ? detailedItem : compressedItem}
      {!addToStore
        ? ""
        : transitions(
            (styles, item) =>
              item && (
                <animated.div style={styles}>
                  <div className="add-to-store" style={cardStyleAddDb}>
                    <div className="item1"></div>
                    <div className="item2"></div>
                    <div className="item3">
                      <input
                        className="input-price"
                        type="number"
                        name="price"
                        value={price.price}
                        defaultValue={newPrice.price}
                        placeholder={newPrice.price}
                        onChange={handleBookPrice}
                      />
                      €
                    </div>
                    <div className="item4">
                      <input
                        className="input-stock"
                        type="number"
                        name="stock"
                        value={stock_quantity.quantity}
                        defaultValue={newStockQuantity.stock}
                        placeholder={newStockQuantity.stock}
                        onChange={handleBookQuantity}
                      />{" "}
                      pcs
                    </div>
                    <div className="item5">
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
                    </div>

                    <div className="item6">
                      {showDeleteBtns && !itemIsDeleted && !itemIsUpdated
                        ? updateAndDelete
                        : null}

                      {!showDeleteBtns && showDeleteConfirm
                        ? confirmation
                        : null}
                      {itemIsDeleted && !itemIsUpdated ? bookDeleted : null}
                      {itemIsUpdated ? bookUpdated : null}
                    </div>
                  </div>
                </animated.div>
              )
          )}
    </div>
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
