import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Link,
  Grid,
  Box,
  IconButton,
  LinearProgress,
  Typography,
  Container,
} from "@mui/material";
import history from "../../../../components/History";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PasswordCheckList from "../../../../components/PasswordCheckList";

//Constante con el formato de validación para cada campo-------------------------------------------
const validationSchema = yup.object({
  // fullName: yup
  //   .string()
  //   .required("Full name is required")
  //   .max(50, "Full name should be maximum 50 characters."),
  userName: yup
    .string("Enter your Username")
    .required("Username is required")
    .max(25, "Username should be maximum 25 characters."),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
    .max(50, "Email should be maximum 50 characters."),
  // serialNumber: yup
  //   .string()
  //   .required("Serial number is required")
  //   .max(12, "Wrong amount of characters.")
  //   .matches(/^[A-Za-z0-9]*$/, "Wrong format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length")
    .max(25, "Password should be maximum 25 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.-])[A-Za-z\d@$!%*#?&.-]{8,}$/,
      "Must meet the requirements below"
    ),
  confirmPassword: yup
    .string()
    .min(8, "Confirm password should be of minimum 8 characters length")
    .max(25, "Confirm password should be maximum 25 characters.")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirmation password is required"),
});

const FirstView = ({
  setView,
  username,
  email,
  pass,
  setUsername,
  setEmail,
  setPass,
}) => {
  // useState para mostrar y ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // useState para mostrar y ocultar confirmar contraseña
  const [showCoPassword, setShowCoPassword] = useState(false);
  const handleClickShowCoPassword = () => setShowCoPassword(!showCoPassword);
  const handleMouseDownCoPassword = () => setShowCoPassword(!showCoPassword);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const action = (key) => (
    <>
      <IconButton
        variant="outlined"
        sx={{
          color: "white",
        }}
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );

  //Configurar los valores a evaluar por el formulario-----------------------------------------------------------

  const formik = useFormik({
    initialValues: {
      // fullName: "",
      userName: username,
      email: email,
      // serialNumber: "",
      password: pass,
      confirmPassword: pass,
    },
    validationSchema: validationSchema, //Se le pasa la costante de formato de cada campo--------------
    onSubmit: (values) => {
      //Si llega acá es porque pasó todas las validaciones, le enviamos los values
      //de cada campo en el formulario, se obtienen con el nombre de cada campo.
      validateNewUser(values);
    },
  });

  const validateNewUser = (values) => {
    setLoading(true);

    const { userName, email } = values;

    const payload = {
      username: userName,
      email: email,
    };

    axios
      .post(`/users/validateNewUser`, payload)
      .then((res) => {
        setLoading(false);

        const { ok, msg } = res.data;

        //Si está todo ok
        if (ok && msg === "Username/email available.") {

          //Mostramos en el front que el usuario está disponible
          enqueueSnackbar(msg, {
            variant: "success",
            autoHideDuration: 3000,
            action,
          });

          //Guardamos la data del primer paso
          setUsername(values.userName);
          setEmail(values.email);
          setPass(values.password);

          //Enviamos al segundo paso
          setView(2);
        } else {

          //Si algo sale mal mostramos el mensaje
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
        }
      })
      .catch((e) => {
        //catch es la respuesta de error en la promesa
        /*Sí los servicios están OFF, retornamos este mensaje*/
        if (e.response === undefined) {
          //Si hay error se detiene el progress bar
          setLoading(false);
          enqueueSnackbar("An error ocurred. Please try again!", {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }

        /*Si ocurre algo en el request, retoramos esto*/
        const { msg, ok } = e.response.data;

        if (msg === undefined || msg === null || msg === "") {
          setLoading(false);
          enqueueSnackbar("An error ocurred. Please try again!", {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }

        if (!ok) {
          setLoading(false);
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }
      });
  };
  return (
    <>
      {/* Titulo de CreateProfile */}
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Create a profile
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        Fill the form. Begin the blacklion experience!
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {/*Campo FullName*/}
          {/* <Grid item xs={12} sm={12}>
          <TextField
            inputProps={{ maxLength: 50 }}
            autoComplete="off"
            name="fullName"
            fullWidth
            id="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid> */}

          {/*Campo userName*/}
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              inputProps={{ maxLength: 25 }}
              id="userName"
              label="Username"
              name="userName"
              autoComplete="off"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={
                formik.touched.userName && formik.errors.userName
                  ? formik.errors.userName
                  : "Type only the username you want to be linked with"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    blacklion.app/
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/*Campo email*/}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          {/*Campo serial number*/}
          {/* <Grid item xs={12}>
          <TextField
            fullWidth
            id="serialNumber"
            label="Type the serial number"
            name="serialNumber"
            value={formik.values.serialNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.serialNumber && Boolean(formik.errors.serialNumber)
            }
            helperText={
              formik.touched.serialNumber && formik.errors.serialNumber
            }
            inputProps={{ maxLength: 12 }}
          />
        </Grid> */}

          {/* Campo de password */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              inputProps={{ maxLength: 25 }}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                setPassword(e.target.value);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          {/* Campo de confirm password*/}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              sx={{ fontSize: "50" }}
              type={showCoPassword ? "text" : "password"}
              inputProps={{ maxLength: 25 }}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCoPassword}
                      onMouseDown={handleMouseDownCoPassword}
                    >
                      {showCoPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={(e) => {
                formik.handleChange(e);
                setPasswordAgain(e.target.value);
              }}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>

          <Grid item xs={12}>
            {password !== "" && (
              <PasswordCheckList
                password={password}
                passwordAgain={passwordAgain}
              />
            )}
          </Grid>
        </Grid>

        {/* Boton de registrarse */}
        {loading ? <LinearProgress sx={{ mt: 2 }} /> : <></>}
        <Grid container>
          {/* <Grid item xs={6}></Grid> */}
          <Grid item xs={12} textAlign="center">
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, mb: 2 }}
              endIcon={<ArrowRightAltIcon />}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FirstView;