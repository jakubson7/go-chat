import React from "react"
import ReactDOM from "react-dom"
import Application from "./Application"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

import "./index.css"

ReactDOM.render(
  <Application />,
  document.querySelector("#application")
)

serviceWorkerRegistration.register()
