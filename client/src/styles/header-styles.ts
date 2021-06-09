import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

interface IProps {
  match: boolean
  show: boolean
}

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fffd",
      backdropFilter: "blur(2px)",

      "& img": {
        borderRadius: "50%",
        marginRight: theme.spacing(2)
      }
    },
    toolbar: {
      padding: theme.spacing(0, 1),

      "& .MuiIconButton-root": {
        marginRight: theme.spacing(1)
      }
    },
    home: ({ show }: IProps) => ({
      textDecoration: "none",
      color: "initial",
      transition: "ease-out 200ms",
      transform: `translateX(${show ? "0" : "-35"}px)`
    }),
    link: ({ match }: IProps) => ({
      color: match ? theme.palette.primary.dark : theme.palette.primary.main,
      marginRight: theme.spacing(2),
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline"
      }
    }),
    avatar: {
      width: 50,
      height: 50,
      color: "white"
    },
    button: {
      padding: theme.spacing(1)
    },
    clearPadding: {
      paddingLeft: 0
    },
    bookedIcon: {
      margin: "auto"
    },
    network: {
      width: theme.spacing(1.2),
      height: theme.spacing(1.2),
      borderRadius: "50%",
      position: "absolute",
      top: "40%",
      right: -28,
      backgroundColor: theme.palette.error.main
    }
  })
)

export default useHeaderStyles
