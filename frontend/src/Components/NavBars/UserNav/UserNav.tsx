import "./UserNav.css";
import { useNavigate } from "react-router-dom";

import { Avatar, Button, Typography } from "@mui/material";

interface UserNavProps {
  onLogout: () => void;

  name: string;
}

function UserNav({ onLogout, name }: UserNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="UserNav">
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
      <div className="middle">
        <Button size="large" color="inherit" onClick={() => navigate("/")}>
          Explore
        </Button>
      </div>
      <div className="right">
        <Avatar sx={{ width: 40, height: 40 }}></Avatar>
        <Typography>{name}</Typography>
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
