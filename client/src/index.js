import React from "react"
import ReactDOM from "react-dom"
import Application from "./Application"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

ReactDOM.render(
  <Application />,
  document.getElementById("root"),
)

serviceWorkerRegistration.register()
