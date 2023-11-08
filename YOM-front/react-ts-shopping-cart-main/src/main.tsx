import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./utilities/UserContext"
import { AdminProvider } from "./utilities/AdminContext"
import ScrollToTop from "./functions/ScrollToTop"
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18/i18n'; // assuming you kept the name as i18n.ts

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <UserProvider>
          <ScrollToTop/>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </UserProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
)
