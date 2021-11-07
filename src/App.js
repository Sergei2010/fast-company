import React from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./app/components/ui/navBar"
import Main from "./app/layouts/main"
import Login from "./app/layouts/login"
import Users from "./app/layouts/users"

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
            </Switch>
        </>
    )
}
export default App
