import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useDetailStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      marginBottom: theme.spacing(3),
      width: "100%"
    },

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
    button: booked => {
      console.log(booked);
      return {
        margin: theme.spacing(2, 0, "auto", "auto"),
        backgroundColor: booked
          ? theme.palette.buttonSecondary.main
          : theme.palette.primary.main
      };
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
