import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ThemeProvider } from "@material-ui/core/styles"
import { getAccessToken } from "./token"
import theme from "./theme"
import TripContextProvider from "./components/TripContext"

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://gql-server-api.herokuapp.com/"
      : "http://localhost:4000"
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <TripContextProvider>
          <App />
        </TripContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
