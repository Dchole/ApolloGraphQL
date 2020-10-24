import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import LaunchDetails from "./pages/launch-details";
import LaunchesList from "./components/LaunchesList";
import BookedLaunches from "./pages/booked-launches";
import Layout from "./components/Layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route exact path="/" component={LaunchesList} />
          <Route exact path="/launches" component={LaunchesList} />
          <Route exact path="/booked" component={BookedLaunches} />
          <Route path="/launches/:id" component={LaunchDetails} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
