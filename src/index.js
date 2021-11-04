import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

/**
 * This page is the starting page for the website in which we starts the integration for backend and frontend by creating a client to serve the queries from the backend to the react app
*/
const client = new ApolloClient({
  uri: "http://localhost:4000/"});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
