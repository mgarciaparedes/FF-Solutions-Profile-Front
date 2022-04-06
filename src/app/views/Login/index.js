import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  LinearProgress,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Backdrop,
  CircularProgress,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../../../components/History";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Components } from "antd/lib/date-picker/generatePicker";

//Constante con el formato de validación para cada campo-----------------------------------------------------
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

//Footer de Formulario Login----------------------------------------------------------------------------------
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//Se crea el tema de plantilla preconfigurado por Material UI para obtener el diseño del Login-----------------
const theme = createTheme();

//Inicio de componente-----------------------------------------------------------------------------------------
export const Login = () => {
  //Valores iniciales
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Variable que guarda la opción Cerrar de los Snackbars
  const action = (key) => (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Close
      </Button>
    </>
  );

  //Setear los valores a evaluar por el formulario-------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema, //Se le pasa la costante de formato de cada campo
    onSubmit: (values) => {
      //Si llega acá es porque pasó todas las validaciones, le enviamos los values
      //de cada campo en el formulario, se obtienen con el nombre de cada campo
      //para este caso particular: values.email y values.password
      signIn(values);
    },
  });

  //Función de reconocimiento de combinación correcta email - password
  const signIn = (values) => {
    //Le indicamos a la app el comienzo del progress bar
    setLoading(true);

    //Desestructuramos values y
    //guardamos como constantes los valores introducidos en formulario
    const { email, password } = values;

    //Guardamos en payload el body en formato json para pasarle al servicio login
    const payload = {
      email: email,
      password: password,
    };

    //Consumimos el servicio login a través de axios
    axios
      .post(`/auth/login/`, payload)
      .then((res) => {
        //Si llegó acá quiere decir que la respuesta es correcta
        //Se inicia sesión
        //Lo primero es detener el progress bar
        setLoading(false);

        //Se desestructura la respuesta del servicio
        const { ok, msg, token, name, userid } = res.data;

        enqueueSnackbar("Login succesfull", {
          variant: "success",
          autoHideDuration: 2000,
          // action,
        });

        //Capturamos el token y lo dejamos en la cabecera
        axios.defaults.headers.common["x-token"] = res.data.token;

        history.push("/dashboard");
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
            // action,
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
            // action,
          });
          return "orlando";
        }

        if (!ok) {
          setLoading(false);
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 3000,
            // action,
          });
          return 1;
        }
      });
  };

  return (
    <>
      {/*Inicio de Tema proporcionado por template de Material UI */}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          {/* Grilla en donde se muestran las imágenes random */}
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Grilla en donde se muestra el formulario */}
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {/* <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            > */}

              {/* Inicio de formulario */}
              <form onSubmit={formik.handleSubmit}>
                {/* Campo Email */}
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                {/* Campo Password */}
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

                {/*Loading progress bar */}
                {loading ? <LinearProgress /> : <></>}
                {/* <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop> */}

                {/* Botón submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                {/* Grilla nueva en donde se muestran opciones de crear profile y cambio de contraseña */}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => history.push("/create-profile")}
                      variant="body2"
                      sx={{ cursor: "pointer" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </form>
              {/* Final del Formulario */}
              {/* </Box> */}
            </Box>
          </Grid>
          {/* Final de Grilla de opciones de crear profile y cambio de contraseña */}
        </Grid>
        {/* Final de Grilla principal del formulario */}
      </ThemeProvider>
    </>
  );
};
