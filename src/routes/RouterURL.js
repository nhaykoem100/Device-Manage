import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import DevicesListUser from "../containers/DevicesListUser";
import HistoryListUser from "../containers/HistoryListUser";
import ManageRequestByUser from "../containers/ManageRequestByUser";
import ManageRequestContainer from "../containers/ManageRequestContainer";
import TrackingContainer from "../containers/TrackingContainer";
import UsersListContainer from "../containers/UsersListContainer";
import MainLayout from "../layout/MainLayout";
import PrivateLogin from "./PrivateLogin";
import PrivateRoute from "./PrivateRoute";

export default function RouterURL() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateLogin exact path="/" component={LoginPage} />
        <PrivateLogin exact path="/login" component={LoginPage} />

        <MainLayout text="asdasdasda">
          <Switch>
            <PrivateRoute
              ROLE={[1, 2]}
              exact
              path="/devices-list-user"
              component={DevicesListUser}
            />

            {/* ========= User =========== */}
            <PrivateRoute
              ROLE={[2]}
              exact
              path="/history-list-user"
              component={HistoryListUser}
            />
            <PrivateRoute
              ROLE={[2]}
              exact
              path="/manage-request-user"
              component={ManageRequestByUser}
            />

            {/* ========= Admin =========== */}
            <PrivateRoute
              ROLE={[1]}
              exact
              path="/manage-request-admin"
              component={ManageRequestContainer}
            />
            <PrivateRoute
              ROLE={[1]}
              exact
              path="/user-list-admin"
              component={UsersListContainer}
            />
            <PrivateRoute
              ROLE={[1]}
              exact
              path="/tracking-admin"
              component={TrackingContainer}
            />
          </Switch>
        </MainLayout>
      </Switch>
    </BrowserRouter>
  );
}
