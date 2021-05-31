/**
 * @description App's menu
 */
import React, { Fragment, useState, useEffect } from "react";

import { Link } from "react-router-dom";

/**
 * @description MatUI
 */

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
    marginLeft: 0,
  },
  tab: {
    ...theme.typography.tab,
    ...theme.css.tab,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigation = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (window.location.pathname === "/insert" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/database" && value !== 1) {
      setValue(1);
    }
  }, [value]);

  /**
   * @desc Menu's routes
   */

  const routes = [
    { name: "Insert Book", link: "/insert", activeIndex: 0 },
    { name: "Book's Database", link: "/database", activeIndex: 1 },
  ];

  /**
   * @description set current path
   */

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;

        default:
          break;
      }
    });
  }, [value, selectedIndex, routes]);

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar className="nav-center">
          <Toolbar
            disableGutters={true}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              float: "none",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <div className="nav-left">
              <div className="logo">
                My Second Hand <br></br>Bookstore
              </div>
            </div>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                className={`${classes.tab} btn-insert`}
                component={Link}
                to="/insert"
                label="Insert"
              />
              <Tab
                className={`${classes.tab} btn-database`}
                component={Link}
                to="/database"
                label="Database"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

export default Navigation;
