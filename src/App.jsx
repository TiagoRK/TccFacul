import "bootstrap/dist/css/bootstrap.min.css"
import { Switch, Route, Redirect } from "react-router-dom"
import { useGlobalUser } from "./context"
import { LoginScreen, RegisterScreen, HomeScreen, SelectedProfile, EditUserScreen } from "./ui/screens"
import "./App.css"

function PrivateRoute({ path, children }) {
  const [user] = useGlobalUser()

  if (!user.token) {
    return <Redirect to="/" />
  }

  return (
    <Route path={path} exact>
      {children}
    </Route>
  )
}

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <HomeScreen />
      </PrivateRoute>
      <Route path="/login" exact>
        <LoginScreen />
      </Route>
      <Route path="/register" exact>
        <RegisterScreen />
      </Route>
      <PrivateRoute path="/selected-profile" exact>
        <SelectedProfile />
      </PrivateRoute>
      <PrivateRoute path="/edit-profile" exact>
        <EditUserScreen />
      </PrivateRoute>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
