import { createStyles, makeStyles } from "@material-ui/core/styles"

const useDetailStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(11, "auto", 8)
    },
    details: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3)
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%"
    },
    button: {
      margin: theme.spacing(2, 0, "auto", "auto")
    },
    links: {
      display: "flex",
      gap: theme.spacing(2),

      "& a": {
        fontSize: "1.02rem",
        color: theme.palette.info.main
      }
    },
    errorBtnWrapper: {
      justifyContent: "center",

      "& > button": {
        marginRight: "auto"
      }
    }
  })
)

export default useDetailStyles
