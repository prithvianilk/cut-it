import { Route, Router, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Signup } from "./Components/SignUp";
import history from "./history";
import DashBoard from "./Pages/Dashboard";

export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/dash" exact component={DashBoard} />
      </Switch>
    </Router>
  );
};
