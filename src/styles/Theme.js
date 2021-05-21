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

  css: {
    tab: {
      minWidth: 10,
      marginLeft: "50px",
      marginRight: "50px",
      textAlign: "center",
      justifyContent: "center",
      justifyItems: "center",
      "&:hover": {
        color: colors.secondaryMain,
      },
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
      marginLeft: "20px",
      "&:hover": {
        backgroundColor: colors.btnOver,
      },
    },
    btnUpdateItem: {
      fontSize: "0.8rem",
      textTransform: "uppercase",
      backgroundColor: colors.secondaryMain,
      color: "white",
      borderRadius: "5px",
      marginBottom: "5px",
      marginTop: "5px",
      marginLeft: "20px",
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
  // cardAddDbBackground:
  //   "linear-gradient(36deg, rgba(255,228,145,1) 12%, rgba(255,214,88,1) 90%)",
  // cardAddDbBackground: "#ffd961",
  // cardAddDbBackground: "#e5e5e5",
  cardAddDbBackground: "white",
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
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "0px 0px 5px 5px",
  boxShadow: "0px 2px 5px -4px rgba(0,0,0,0.50)",
};
