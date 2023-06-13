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
import {
  getUserAction,
  isLoggedInAction,
  usersState,
} from "../../../Redux/usersReducer";

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
        if (travel.dispatch(getUserAction(response.data)).payload.length > 0) {
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
            id="outlined-basic"
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
            id="outlined-basic"
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

// import { useForm } from "react-hook-form";
// import { NavLink } from "react-router-dom";
// import "./Login.css";
// import {
//   Link,
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   CssBaseline,
//   FormControlLabel,
//   Grid,
//   TextField,
//   ThemeProvider,
//   Typography,
// } from "@mui/material";
// import { Copyright } from "@mui/icons-material";
// import User from "../../Models/User";

// function Login(): JSX.Element {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<User>();

//   const send = (userData: User) => {
//     console.log(userData);
//   };

//   return (
//     <div className="Login">
//       <NavLink to="/main">Main</NavLink>
//       {/* <ThemeProvider theme={theme}> */}
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             // marginTop: 2,
//             // marginBottom: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}>
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>

//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form onSubmit={handleSubmit(send)}>
//             <Box component="form" noValidate sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   {/* <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 /> */}{" "}
//                   <TextField
//                     margin="normal"
//                     // required
//                     fullWidth
//                     // id="email"
//                     label="Email Address"
//                     autoComplete="email"
//                     autoFocus
//                     {...register("email", {
//                       required: { value: true, message: "אנא הזן שם משתמש" },
//                       minLength: {
//                         value: 5,
//                         message: "אנא הזן שם משתמש ארוך מ5 תווים",
//                       },
//                     })}
//                   />
//                   <span>{errors.email?.message}</span>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth

//                     label="Password"
//                     type="password"

//                     autoComplete="new-password"
//                     {...register("password", {
//                       required: { value: true, message: "אנא הזן  סיסמא" },
//                       minLength: {
//                         value: 5,
//                         message: "אנא הזן שם סיסמא ארוכה מ5 תווים",
//                       },
//                     })}
//                   />
//                    <span>{errors.email?.message}</span>
//                 </Grid>
//                 {/* <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid> */}
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}>
//                 Sign in
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   {/* <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link> */}
//                 </Grid>
//               </Grid>
//             </Box>
//           </form>
//         </Box>
//         {/* <Copyright sx={{ mt: 5 }} /> */}
//         {/* </ThemeProvider> */}
//         <Link href="/register" variant="body2" color="secondary">
//           don't have an account? register
//         </Link>{" "}
//       </Container>
//     </div>
//   );
// }

// export default Login;
