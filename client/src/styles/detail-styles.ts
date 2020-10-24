import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useDetailStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      [theme.breakpoints.up("md")]: {
        display: "grid",
        gridColumnGap: theme.spacing(2),
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateAreas: ` 
      "img img heading heading"
      "img img subheading subheading"
      "img img . book"
      `,

        "& > span:first-child": {
          gridArea: "img"
        },
        "& > span:nth-child(2)": {
          gridArea: "heading"
        },
        "& > span:nth-child(3)": {
          gridArea: "subheading"
        },
        "& > span:last-child": {
          gridArea: "book"
        }
      }
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%"
    },
    button: {
      margin: theme.spacing(2, 0, "auto", "auto")
    },
    errorBtnWrapper: {
      justifyContent: "center",

      "& > button": {
        marginRight: "auto"
      }
    }
  })
);

export default useDetailStyles;
