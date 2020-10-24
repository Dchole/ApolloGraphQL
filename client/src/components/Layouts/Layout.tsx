import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { getAccessToken } from "../../token";
import FormWrapper from "../FormWrapper";

const Layout: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken())
  );

  const handleSetAuth = () => setIsAuthenticated(Boolean(getAccessToken()));

  return (
    <>
      <Header />
      {isAuthenticated ? (
        children
      ) : (
        <FormWrapper handleSetAuth={handleSetAuth} />
      )}
      <Navbar />
    </>
  );
};

export default Layout;
