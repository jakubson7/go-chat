import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import { RecoilRoot } from "recoil"
import NotFoundPage from "./components/NotFoundPage"
import RoomPage from "./components/RoomPage"

const Application: React.FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Switch>
        <Route path='/room/:ID' component={RoomPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </RecoilRoot>
)

export default Application
