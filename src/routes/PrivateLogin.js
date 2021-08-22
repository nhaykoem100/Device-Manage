import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateLogin({ component: Component, ...rest }) {
  const logged = localStorage.getItem("isLogged");
  // console.log("===logged in privatelogin===", logged);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!logged) {
          // console.log("chay vao` !logged");
          return <Component {...props} />;
        } else {
          // console.log("chay vao` logged = true");
          return (
            <Redirect
              to={{
                pathname: "/devices-list-user",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateLogin;
