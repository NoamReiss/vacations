import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Typography } from "@mui/material";

interface AdminNavProps {
  onLogout: () => void;

  name: string;
}

function AdminNav({ onLogout, name }: AdminNavProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="AdminNav">
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
        <Button
          size="large"
          color="inherit"
          onClick={() => {
            navigate("/addVacation");
          }}>
          Add Vacation
        </Button>
        <Button size="large" color="inherit" onClick={() => navigate("/")}>
          Explore
        </Button>

        <Button
          size="large"
          color="inherit"
          onClick={() => {
            navigate("/reports");
          }}>
          Reports
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

export default AdminNav;
