import React, { Fragment, useState, useEffect } from "react";

import { Link } from "react-router-dom";

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
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "100px",
    "&:hover": {
      color: "white",
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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

  const routes = [
    { name: "Insert Book", link: "/insert", activeIndex: 0 },
    { name: "Book's Database", link: "/database", activeIndex: 1 },
  ];

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
        <AppBar>
          <Toolbar>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                className={classes.tab}
                component={Link}
                to="/insert"
                label="Insert"
              />
              <Tab
                className={classes.tab}
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
