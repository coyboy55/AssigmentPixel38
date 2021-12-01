import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';
import { getCookie } from './cookie';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql',
});

const defaultOptions = {
  query: {
    fetchPolicy: "network-only",
    nextFetchPolicy:'network-only',
    errorPolicy: "all"
  }
};
  const authLink = setContext((_, { headers }) => {
    const token = getCookie('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const link = authLink.concat(httpLink)
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache,
    defaultOptions:defaultOptions
  });



ReactDOM.render(
  <React.StrictMode>
<Router>
<ApolloProvider client={client}>
 
     <App/>
   </ApolloProvider>
</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
