import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import "./styles/app.scss";

export const baseLink = "http://localhost:3002/api/v1";

/**
 * Main - Wrap App with context provider to get user in all components.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
)
