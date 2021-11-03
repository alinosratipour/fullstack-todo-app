import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

const SecureRoute = () => {
  const hasToken = !!localStorage.getItem("token");
  if (hasToken) {
    return (
      <>
        <Redirect to="/dashboard" />
        <Dashboard />
      </>
    );
  } else if (!hasToken) {
    return (
      <>
        <Redirect to="/login" />
        <Login />
      </>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
};
export default SecureRoute;
