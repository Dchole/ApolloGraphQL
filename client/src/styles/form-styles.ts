import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      margin: theme.spacing(1, "auto")
    },
    button: {
      marginTop: theme.spacing(2)
    }
  })
);

export default useFormStyles;
