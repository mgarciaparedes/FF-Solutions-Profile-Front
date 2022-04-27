import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockResetIcon from "@mui/icons-material/LockReset";
import history from "../../../components/History";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";
import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";

const theme = createTheme();

const schema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.-])[A-Za-z\d@$!%*#?&.-]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm new password is required"),
});

export const ChangePassword = () => {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      sendCode(values);
    },
  });

  const sendCode = (event) => {
    const payload = {
      currentPassword: event.currentPassword,
      newPassword: event.newPassword,
      confirmNewPassword: event.confirmNewPassword,
    };

    axios
      .post("/auth/changePassword", payload)
      .then((res) => {
        if (res.data.ok === false) {
          console.log("Hubo un error inesperado");
        } else {
          console.log("Cambios realizados con exito");
        }

        // setDisabledButton(false);
      })
      .catch(function (error) {
        // setDisabledButton(false);
        console.log("Hubo un error");
      });
  };

  return (
    <>
      <Navbar />

      <ThemeProvider theme={theme}>
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
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", height: 50, width: 50 }}
            >
              <LockResetIcon fontSize="large" />
            </Avatar>
            {/* Tipografía de forgot password */}
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              {/* Formulario de current password */}

              <TextField
                focused
                margin="normal"
                fullWidth
                id="currentPassword"
                label="Current password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />

              <TextField
                focused
                margin="normal"
                fullWidth
                id="newPassword"
                label="New password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />

              <TextField
                focused
                margin="normal"
                fullWidth
                id="confirmNewPassword"
                label="Confirm new password"
                name="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmNewPassword &&
                  Boolean(formik.errors.confirmNewPassword)
                }
                helperText={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change password
              </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
