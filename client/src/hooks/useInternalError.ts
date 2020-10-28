import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";

const useInternalError = (error: ApolloError | undefined) => {
  const [internalError, setInternalError] = useState("");

  const handleClose = () => setInternalError("");

  useEffect(() => {
    if (error) {
      if (error.networkError) {
        setInternalError("Network Error");
      } else if (error.graphQLErrors[0].extensions?.code !== "BAD_USER_INPUT") {
        setInternalError("Something went wrong, Please try again!!!");
      }
    }
  }, [error]);

  return { internalError, handleClose };
};

export default useInternalError;
