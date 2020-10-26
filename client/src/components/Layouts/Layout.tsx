import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FormWrapper from "../FormWrapper";
import { clearAccessToken, getAccessToken } from "../../token";

const Layout: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken())
  );

  const handleSetAuth = () => setIsAuthenticated(Boolean(getAccessToken()));

  const handleLogout = () => {
    clearAccessToken();
    handleSetAuth();
  };

  return (
    <>
      <Header logout={handleLogout} />
      {isAuthenticated ? (
        <main>{children}</main>
      ) : (
        <FormWrapper handleSetAuth={handleSetAuth} />
      )}
      <Navbar handleLogout={handleLogout} />
    </>
  );
};

export default Layout;
