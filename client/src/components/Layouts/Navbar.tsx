import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useNavbarStyles from "../../styles/navbar-styles";
import { Link } from "react-router-dom";

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
  }
};

const Navbar = () => {
  const classes = useNavbarStyles();
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  const paths = ["/", "/booked", "/profile"];

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
        {Object.keys(menu).map((item, index) => (
          <BottomNavigationAction
            key={item}
            component={Link}
            to={index === 0 ? "/" : `/${item}`}
            label={menu[item].label}
            icon={menu[item].icon}
            role={undefined}
          />
        ))}
        <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
