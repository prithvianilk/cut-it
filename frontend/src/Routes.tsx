import { Route, Router, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import history from "./history";

export const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </Router>
    );
};
