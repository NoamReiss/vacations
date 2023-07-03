import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { travel } from "../../../Redux/TravelStore";
import { getUserAction, isLoggedInAction } from "../../../Redux/usersReducer";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [isPass, setIsPass] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const send = async (userData: User) => {
    await axios
      .post(`http://localhost:4000/api/v1/vacations/getUser`, userData)
      .then((response) => {
        if (travel.dispatch(getUserAction(response.data)).payload) {
          travel.dispatch(isLoggedInAction(true));

          navigate("/");
        } else {
          setIsPass(true);
        }
      });
  };
  return (
    <div className="Login">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <br /> <br />
        <form onSubmit={handleSubmit(send)}>
          <TextField
            className="outlined-basic"
            label="Email"
            variant="outlined"
            {...register("email", {
              required: { value: true, message: "אנא הזן אימייל " },
              minLength: {
                value: 5,
                message: " אנא הזן אימייל ארוך מ5 תווים ",
              },
            })}
          />
          <br />
          <span className="ErrMsg">{errors.email?.message}</span>
          <br />
          <TextField
            className="outlined-basic"
            label="Password"
            type="password"
            onKeyUp={() => setIsPass(false)}
            variant="outlined"
            {...register("password", {
              required: { value: true, message: "אנא הזן סיסמא" },
              minLength: {
                value: 5,
                message: "אנא הזן סיסמא ארוכה מ5 תווים",
              },
            })}
          />
          <br />
          <span className="ErrMsg">{errors.password?.message}</span>
          {isPass && <span className="ErrMsg">wrong password</span>}
          <br />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <br /> <br />
      </Box>
      <p>Don't have an account?</p>
      <Link href="/register" variant="body2" color="secondary">
        register now
      </Link>
    </div>
  );
}

export default Login;
