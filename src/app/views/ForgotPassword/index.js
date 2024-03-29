import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockResetIcon from "@mui/icons-material/LockReset";
import history from "../../../components/History.js";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

const theme = createTheme();

const schema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required")
    .max(50, "Email should be maximum 50 characters."),
});

export const ForgotPassword = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      sendCode(values);
    },
  });

  const sendCode = (values) => {
    console.log(values);

    const { email } = values;

    const payload = {
      email: email,
    };

    axios
      .post("auth/forgotPassword", payload)
      .then((resp) => {
        const { msg, ok } = resp.data;

        if (
          ok &&
          msg ===
            "Password was sent to your email, please follow the steps to login again."
        ) {
          enqueueSnackbar(msg, {
            variant: "success",
            autoHideDuration: 2500,
          });
          setTimeout(() => {
            history.push("/login");
          }, 2500);
        }
      })
      .catch((err) => {
        const { ok, msg } = err.response.data;

        if (err.value === undefined) {
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 2500,
          });
        } else if (!ok) {
          enqueueSnackbar("Error, try again.", {
            variant: "error",
            autoHideDuration: 2500,
          });
        }
      });
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 17,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Icono de forgot password */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main", height: 50, width: 50 }}>
            <LockResetIcon fontSize="large" />
          </Avatar>
          {/* Tipografía de forgot password */}
          <Typography component="h1" variant="h5">
            Forgot password?
          </Typography>

          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <form onSubmit={formik.handleSubmit}>
            {/* Formulario de email */}

            <TextField
              margin="normal"
              inputProps={{ maxlength: 50 }}
              fullWidth
              id="email"
              label="Example: email@email.com"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Send verification code
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    history.push("/login");
                  }}
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                  color="primary.light"
                >
                  Back to Login?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    history.push("/create-profile");
                  }}
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                  color="primary.light"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
          {/* </Box> */}
        </Box>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
};
