import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { GRAPH_QL_URI } from "./envirement";
import { Provider } from "react-redux";
import store from "./redux/store";
const client = new ApolloClient({
  uri: GRAPH_QL_URI,
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ApolloProvider client={client}>
    <ToastContainer />
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </>
);


reportWebVitals();
