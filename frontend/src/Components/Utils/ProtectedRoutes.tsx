import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { travel } from "../../Redux/TravelStore";
import { log } from "console";

const userAuth = () => {
  const userLogged = travel.getState().users.isLoggedIn;
  const user = travel.getState().users;
  console.log(user);

  return { userLogged, user };
};

const PrivateRoutes = () => {
  const { userLogged } = userAuth();

  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoutes = () => {
  const { userLogged } = userAuth();
  if (userLogged === true) {
    const user = travel.getState().users.users[0];
    return user.isAdmin ? <Outlet /> : <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export { PrivateRoutes, AdminRoutes };
