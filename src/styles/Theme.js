import { createMuiTheme } from "@material-ui/core/styles";

export const colors = {
  arcBlue: "#0B72B9",
  arcOrange: "#FFBA60",
  primaryMain: "#324376", //dark blue
  primaryLight: "#586BA4", // light blue
  secondaryMain: "#a49158", // sand / gold
  errorMain: "#EA1E0B", // Red
  warningMain: "#F76C5E", // light red / orange
  infoMain: "#F5DD90", // light yellow
  successMain: "#918F0F", // olive
  btnOver: "red",
};

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        // padding: "0px",
      },
    },
  },

  palette: {
    common: {
      blue: `${colors.arcBlue}`,
      orange: `${colors.arcOrange}`,
    },
    primary: { main: `${colors.primaryMain}`, light: `${colors.primaryLight}` },
    secondary: {
      main: `${colors.secondaryMain}`,
    },
    error: { main: `${colors.errorMain}` },
    warning: { main: `${colors.warningMain}` },
    info: { main: `${colors.infoMain}` },
    success: { main: `${colors.successMain}` },
  },
  //   typography: { useNextVariants: true },
  typography: {
    tab: {
      fontFamily: "Raleway",
      fontWeight: 800,
      fontSize: "1.1rem",
      textTransform: "uppercase",
    },
  },
  "& .MuiButton-root": {
    padding: "0px",
  },
  buttons: {
    btnAddDb: {
      fontSize: "0.9rem",
      textTransform: "uppercase",
      backgroundColor: colors.secondaryMain,
      color: "white",
      borderRadius: "5px",
      padding: "5px",
      paddingRight: "8px",
      paddingLeft: "8px",
      "&:hover": {
        backgroundColor: colors.btnOver,
      },
    },
    btnUpdateItem: {
      fontSize: "0.8rem",
      // width: "250px",
      textTransform: colors.secondaryMain,
      backgroundColor: "red",
      color: "white",
      borderRadius: "5px",
      padding: "0px",
      paddingRight: "8px",
      paddingLeft: "8px",
      "&:hover": {
        backgroundColor: colors.btnOver,
      },
    },
  },
  tableFound: {
    backgroundColor: colors.secondaryMain,
  },
});

// CARD INSERT STYLE

export const cardColors = {
  cardBackground: "white",
  cardText: colors.primaryMain,
  cardAddDbBackground: "#e5e5e5",
};

export const cardStyle = {
  marginTop: 5,
  marginRight: 5,
  marginLeft: 5,
  backgroundColor: cardColors.cardBackground,
  color: cardColors.cardText,
  border: "2px solid rgba(0, 0, 0, 0)",
  borderRadius: 3,
  boxShadow: "1px 2px 9px -2px rgba(0,0,0,0.24)",
};

export const cardStyleAddDb = {
  // zIndex: -1,
  marginTop: -1,
  marginRight: 5,
  marginLeft: 5,
  marginBottom: 5,
  backgroundColor: cardColors.cardAddDbBackground,
  color: cardColors.cardText,
  border: "0px 0px 2px 2px solid rgba(0, 0, 0, 0)",
  borderRadius: 3,
  boxShadow: "1px 2px 9px -4px rgba(0,0,0,0.10)",
};
