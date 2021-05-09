import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "./components/Launches";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src="https://raw.githubusercontent.com/bradtraversy/spacex_launch_stats/master/client/src/logo.png"
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:id" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
