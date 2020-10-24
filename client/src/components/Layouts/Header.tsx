import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/images/dog-3.png";
import useHeaderStyles from "../../styles/header-styles";

const Header = () => {
  const classes = useHeaderStyles();

  return (
    <AppBar position="fixed" variant="outlined" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <img src={logo} alt="logo" width="50" />
        <Typography variant="h5" component="span">
          Space Explorer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
