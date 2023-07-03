import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import {
  Link,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import { addUserAction } from "../../../Redux/usersReducer";
import { travel } from "../../../Redux/TravelStore";
import { useState } from "react";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [isPass, setIsPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const validateEmail = async (email: string) => {
    let vEmail;
    await axios
      .post(`http://localhost:4000/api/v1/vacations/getUserByEmail/${email}`)
      .then((response) => {
        vEmail = response.data;
      });
    if (vEmail) {
      return true;
    } else {
      return false;
    }
  };

  const send = async (userData: User) => {
    if (await validateEmail(userData.email)) {
      setIsPass(true);
      return;
    }
    await axios
      .post("http://localhost:4000/api/v1/vacations/addUser", userData)
      .then((response) => {
        travel.dispatch(addUserAction(response.data));
        navigate("/");
      });
  };
  return (
    <div className="Register">
      <NavLink to="/main">Main</NavLink>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(send)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("private_name", {
                      required: {
                        value: true,
                        message: "please enter First Name  ",
                      },
                      minLength: {
                        value: 1,
                        message: " please enter a longer First Name ",
                      },
                    })}
                  />
                  <span className="ErrMsg">{errors.private_name?.message}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "please enter a Name  ",
                      },
                      minLength: {
                        value: 2,
                        message: " please enter  longer  Name ",
                      },
                    })}
                  />
                  <span className="ErrMsg">{errors.last_name?.message}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    onKeyUp={() => setIsPass(false)}
                    type="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "please enter email  ",
                      },
                      minLength: {
                        value: 1,
                        message: " please enter a valid email address",
                      },
                    })}
                  />
                  <span className="ErrMsg">{errors.email?.message}</span>
                  {isPass && (
                    <span className="ErrMsg">
                      this email Already have an account
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "please enter password  ",
                      },
                      minLength: {
                        value: 5,
                        message: " please enter a valid password",
                      },
                    })}
                  />
                  <span className="ErrMsg">{errors.password?.message}</span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </form>
            <Grid container justifyContent="center">
              <Link href="/login" variant="body2" color="secondary">
                Already a member?login
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
