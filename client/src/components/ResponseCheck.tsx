import React from "react";
import { ApolloError } from "@apollo/client";
import Skeleton from "@material-ui/lab/Skeleton";
import useCardStyles from "../styles/card-styles";
import errorImage from "../assets/images/badge-3.png";

interface IResponseProps {
  loading: boolean;
  error: ApolloError | undefined;
}

const ResponseCheck: React.FC<IResponseProps> = ({ loading, error }) => {
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

  if (error)
    return <img src={errorImage} alt="Error" className={classes.errorImg} />;

  return <></>;
};

export default ResponseCheck;
