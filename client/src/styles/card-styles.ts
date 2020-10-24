import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0),
      transition: "ease-out 100ms"
    },
    actionArea: {
      margin: 0,
      padding: theme.spacing(2, 2, 5),

      "& img": {
        height: 60,
        width: 60,
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: theme.spacing(2)
      }
    },
    errorImg: {
      width: "100%"
    }
  })
);

export default useCardStyles;
