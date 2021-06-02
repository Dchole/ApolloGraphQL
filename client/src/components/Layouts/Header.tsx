import { useEffect, useState } from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Menu from "@material-ui/core/Menu"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import BookIcon from "@material-ui/icons/Book"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import logo from "../../assets/images/dog-3.png"
import useHeaderStyles from "../../styles/header-styles"
import useDesktopView from "../../hooks/useDesktopView"
import { paths } from "./Navbar"
import { normalizePathname } from "../../utils"

interface IHeaderProps {
  logout: () => void
}

const Header: React.FC<IHeaderProps> = ({ logout }) => {
  const { goBack, location } = useHistory()
  const [show, setShow] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const match = Boolean(useRouteMatch("/booked")?.isExact)
  const classes = useHeaderStyles({ match, show })
  const desktopView = useDesktopView()

  const handleClose = () => setAnchorEl(null)
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  useEffect(() => {
    const currentPath = normalizePathname(location.pathname)

    if (!paths.includes(currentPath) && !desktopView) setShow(true)
    else setShow(false)
  }, [location.pathname, desktopView])

  return (
    <AppBar position="fixed" variant="outlined" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton aria-label="menu" size="small" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Grid
          // @ts-ignore
          component={desktopView ? Link : undefined}
          to="/"
          alignItems="center"
          container
          className={classes.home}
        >
          <img
            src={logo}
            alt="space explorer logo"
            width="50"
            height="50"
            loading="lazy"
          />
          <Typography variant="h5" component="span">
            Space Explorer
          </Typography>
        </Grid>
        {desktopView && (
          <Grid alignItems="center" justify="flex-end" container>
            <Link to="/booked" className={classes.link}>
              <Grid
                direction="column"
                alignContent="center"
                justify="center"
                container
                xs={9}
                item
              >
                <BookIcon className={classes.bookedIcon} />
                <Typography component="small" variant="caption">
                  Booked
                </Typography>
              </Grid>
            </Link>
            <Grid item>
              <IconButton
                aria-label="menu"
                onClick={handleOpen}
                className={classes.button}
              >
                <Avatar className={classes.avatar} />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          <MenuList>
            <MenuItem component={Link} to="/account" onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
