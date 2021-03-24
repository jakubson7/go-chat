import React from "react"
import { Route, Router, Switch } from "react-router"
import { RecoilRoot } from "recoil"
import NotFoundPage from "./components/NotFoundPage"
import RoomPage from "./components/RoomPage"

const Application: React.FC = () => (
  <RecoilRoot>
    {/* @ts-ignore  */}
    <Router>
      <Switch>
        <Route path='/room/:ID'>
          <RoomPage />
        </Route>
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </RecoilRoot>
)

export default Application
