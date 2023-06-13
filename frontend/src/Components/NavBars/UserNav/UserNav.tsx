import React from "react";
import "./UserNav.css";
import { useNavigate } from "react-router-dom";

import { Avatar, Button, Typography } from "@mui/material";
// import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserNavProps {
  onLogout: () => void;
  initials: string;
}

function UserNav({ onLogout, initials }: UserNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="UserNav">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}>
        {/* <FontAwesomeIcon
          icon={faPlaneDeparture}
          size="xl"
          style={{ color: "#ffffff", marginRight: "5px" }}
        /> */}

        <Typography variant="h4" component="div">
          Travel
        </Typography>
      </div>
      <div className="middle">
        <Button size="large" color="inherit" onClick={() => navigate("/")}>
          Explore
        </Button>
      </div>
      <div className="right">
        <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar>
        <Button
          size="large"
          sx={{ height: "2rem" }}
          color="inherit"
          onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default UserNav;
