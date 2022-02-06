import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import NavBar from "./app/components/ui/navBar"
import Main from "./app/layouts/main"
import Login from "./app/layouts/login"
import Users from "./app/layouts/users"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./app/hooks/useProfession"
import AuthProvider from "./app/hooks/useAuth"
import ProtectedRoute from "./app/components/common/protectedRoute"
import LogOut from "./app/layouts/logOut"
import { useDispatch } from "react-redux"
import { loadQualityList } from "./app/store/qualities"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualityList())
  }, [])
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}
export default App
