import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ ROLE: roles, component: Component, ...rest }) {
  const location = useLocation();
  const logged = localStorage.getItem("isLogged");
  const decode = jwt_decode(localStorage.getItem("token"));
  let role = decode.role;
  // console.log("role: ", role);
  // console.log("roles: ", roles);
  let compare = roles.includes(role);
  // console.log("compare: ", compare);

  if (!compare) {
    return (
      <Redirect
        to={{
          pathname: "/devices-list-user",
        }}
      />
    );
  }

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (logged) {
            return <Component {...props} />;
          } else {
            // localStorage.setItem("path", location.pathname);
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: location,
                  },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
}

export default PrivateRoute;
