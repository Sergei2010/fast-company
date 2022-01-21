import React from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./app/components/ui/navBar"
import Main from "./app/layouts/main"
import Login from "./app/layouts/login"
import Users from "./app/layouts/users"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./app/hooks/useProfession"
import { QualitiesProvider } from "./app/hooks/useQualities"

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <QualitiesProvider>
          <ProfessionProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </ProfessionProvider>
        </QualitiesProvider>
        <Route path="/" exact component={Main} />
      </Switch>
      <ToastContainer />
    </>
  )
}
export default App
