import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Launches from "./pages/launches";
import LaunchDetails from "./pages/launch-details";
import Layout from "./components/Layouts/Layout";

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Router>
          <Launches path="launches" />
          <Launches path="/" />
          <LaunchDetails path="launches/:id" />
        </Router>
      </Layout>
    </>
  );
}

export default App;
