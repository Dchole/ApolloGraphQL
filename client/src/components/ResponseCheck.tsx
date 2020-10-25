import React from "react";
import { ApolloError } from "@apollo/client";
import Skeleton from "@material-ui/lab/Skeleton";
import useCardStyles from "../styles/card-styles";
import Error from "./Error";

interface IResponseProps {
  loading: boolean;
  error: ApolloError | undefined;
  refetch: VoidFunction;
}

const ResponseCheck: React.FC<IResponseProps> = ({
  loading,
  error,
  refetch
}) => {
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

  if (error) return <Error loading={loading} refetch={refetch} />;

  return <></>;
};

export default ResponseCheck;
