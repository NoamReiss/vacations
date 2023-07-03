import { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import "./Header.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { travel } from "../../../Redux/TravelStore";
import AdminNav from "../../NavBars/AdminNav/AdminNav";
import UserNav from "../../NavBars/UserNav/UserNav";
import { isLoggedInAction } from "../../../Redux/usersReducer";
import { userIsAdmin, userLoggedIn } from "../../Utils/AuthUtils";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const loggedIn = userLoggedIn();
  const isAdmin = userIsAdmin();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (loggedIn) {
      const user = travel.getState().users.users[0];

      setName(user.private_name + " " + user.last_name);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    travel.dispatch(isLoggedInAction(false));
    navigate("/login");
  };

  return (
    <div className="Header">
      <AppBar color="transparent" style={{ position: "static" }}>
        <Toolbar>
          {!loggedIn ? (
            <>
              <div
                className="logo"
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}>
                <Typography variant="h3" component="div">
                  Travel and Fun
                </Typography>
              </div>
              <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Stack>
            </>
          ) : isAdmin ? (
            <AdminNav onLogout={handleLogout} name={name} />
          ) : (
            <UserNav onLogout={handleLogout} name={name} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
