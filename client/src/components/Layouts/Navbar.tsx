import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Box from "@material-ui/core/Box"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import Slide from "@material-ui/core/Slide"
import HomeIcon from "@material-ui/icons/Home"
import BookIcon from "@material-ui/icons/Book"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import useNavbarStyles from "../../styles/navbar-styles"
import useDesktopView from "../../hooks/useDesktopView"
import { normalizePathname } from "../../utils/normalize-pathname"

const menu = [
  {
    path: "/",
    label: "Home",
    icon: <HomeIcon />
  },
  {
    path: "/booked",
    label: "Booked",
    icon: <BookIcon />
  },
  {
    path: "/account",
    label: "Account",
    icon: <PersonIcon />
  }
]

export const paths = menu.map(item => item.path)

interface INavbarProps {
  handleLogout: () => void
}

const Navbar: React.FC<INavbarProps> = ({ handleLogout }) => {
  const classes = useNavbarStyles()
  const desktopView = useDesktopView()
  const { pathname } = useLocation()
  const [value, setValue] = useState(0)
  const [show, setShow] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    setCurrentPath(normalizePathname(pathname))

    if (!paths.includes(currentPath) || desktopView) setShow(false)
    else setShow(true)
  }, [desktopView, currentPath, pathname])

  useEffect(() => {
    setValue(paths.indexOf(currentPath))
  }, [currentPath])

  return (
    <Slide direction="up" in={show}>
      <Box
        position="fixed"
        bottom={0}
        zIndex="modal"
        className={classes.root}
        component="nav"
        borderTop={1.5}
        borderColor="grey.300"
      >
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          showLabels
          className={classes.bottomNav}
        >
          {menu.map(item => (
            <BottomNavigationAction
              key={item.label}
              component={Link}
              to={item.path}
              label={item.label}
              icon={item.icon}
              role={undefined}
            />
          ))}
          <BottomNavigationAction
            label="Logout"
            icon={<ExitToAppIcon />}
            onClick={handleLogout}
          />
        </BottomNavigation>
      </Box>
    </Slide>
  )
}

export default Navbar
