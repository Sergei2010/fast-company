import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import NavBar from "./app/components/ui/navBar"
import Main from "./app/layouts/main"
import Login from "./app/layouts/login"
import Users from "./app/layouts/users"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./app/hooks/useProfession"
import { QualitiesProvider } from "./app/hooks/useQualities"
import AuthProvider from "./app/hooks/useAuth"
import ProtectedRoute from "./app/components/common/protectedRoute"
import LogOut from "./app/layouts/logOut"

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}
export default App
