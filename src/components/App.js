import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";

import "../style/main.scss";
import icons from "../helpers/icons";
import Dashboard from "./pages/Dashboard";
import SingleDashboard from "./pages/SingleDashboard";
import Login from "./pages/Login";
// import MainLogo from "..assets/logos/logo.png"

icons();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();

  function handleSuccessfulLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    history.push("/login");
  }

  return (
    <div className="App">
      {/* <img src={MainLogo} */}
      <Switch>
        <Route
          path="/login"
          render={(routeProps) => (
            <Login
              {...routeProps}
              handleSuccessfulLogin={handleSuccessfulLogin}
            />
          )}
        />
        {isLoggedIn && (
          <>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/:uid" component={SingleDashboard} />
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        <Redirect exact from="/" to="/login" />
      </Switch>
    </div>
  );
}
