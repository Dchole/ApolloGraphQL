import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useErrorStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      placeItems: "center"
    },
    message: {
      fontSize: "x-large"
    },
    button: {
      backgroundColor: theme.palette.buttonSecondary.main,
      margin: theme.spacing(2, "auto"),

      "&:hover": {
        backgroundColor: theme.palette.buttonSecondary.light
      }
    }
  })
);

export default useErrorStyles;
