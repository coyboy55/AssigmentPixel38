import React, { useContext } from "react";
import SessionContext from "./components/session/SessionContext";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Shipment from './pages/shipment/shipment'
import Register from "./pages/Register/Register";


export default function Routes(props) {

  const {
    session: {
      user: { token },
    },
  } = useContext(SessionContext);

  return (
    <>
 
        <Switch>
          <PrivateRoute
            path="/"
            component={Shipment}
            token={token}
            exact
          />

          <PublicRoute path="/login" component={Login} token={token} />
          <PublicRoute path="/register" component={Register} token={token} />
        </Switch>

    </>
  );
}

function PublicRoute({ path, component: Component, token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

function PrivateRoute({ path, component: Component, token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
