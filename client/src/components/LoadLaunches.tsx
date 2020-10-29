import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useCardStyles from "../styles/card-styles";

interface IResponseProps {
  loading: boolean;
}

const ResponseCheck: React.FC<IResponseProps> = ({ loading }) => {
  const classes = useCardStyles();

  if (loading)
    return (
      <>
        {[1, 2, 3, 4, 5].map(item => (
          <Skeleton
            key={item}
            component="div"
            variant="rect"
            animation="wave"
            width="100%"
            height={118}
            className={classes.root}
          />
        ))}
      </>
    );

  return <></>;
};

export default ResponseCheck;
