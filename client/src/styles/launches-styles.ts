import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useLaunchesStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: desktopView => ({
      margin: desktopView
        ? theme.spacing(12, "auto", 4)
        : theme.spacing(9, "auto", 8)
    }),
    action: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      padding: theme.spacing(1.2, 4),
      margin: theme.spacing(2, "auto"),
      fontSize: "large",
      backgroundColor: theme.palette.buttonSecondary.main,
      color: "white",

      "&:hover": {
        backgroundColor: theme.palette.buttonSecondary.light
      }
    },
    loadingBtn: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8)
    }
  })
);

export default useLaunchesStyles;
