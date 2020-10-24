import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useNavbarStyles from "../../styles/navbar-styles";
import { Link } from "@reach/router";

interface IMenu {
  [key: string]: any;
}

const menu: IMenu = {
  home: {
    label: "Home",
    icon: <HomeIcon />
  },
  booked: {
    label: "Booked",
    icon: <BookIcon />
  },
  profile: {
    label: "Profile",
    icon: <PersonIcon />
  },
  logout: {
    label: "Logout",
    icon: <ExitToAppIcon />
  }
};

const Navbar = () => {
  const classes = useNavbarStyles();
  const [value, setValue] = useState(0);

  return (
    <Box
      position="fixed"
      bottom={0}
      zIndex="modal"
      boxShadow={6}
      className={classes.root}
      component="nav"
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels
        className={classes.bottomNav}
      >
        {Object.keys(menu).map(item => (
          <BottomNavigationAction
            key={item}
            component={Link}
            to={item}
            label={menu[item].label}
            icon={menu[item].icon}
            role={undefined}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
