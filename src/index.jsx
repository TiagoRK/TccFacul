import React from "react"
import ReactDOM from "react-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faCheckSquare, faCoffee, faEye, faCommentAlt, faHeart } from "@fortawesome/free-solid-svg-icons"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { UserGlobalProvider } from "../src/context/user-context/user.context"

library.add(fab, faCheckSquare, faCoffee, faEye, faCommentAlt, faHeart)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserGlobalProvider>
        <App />
      </UserGlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
