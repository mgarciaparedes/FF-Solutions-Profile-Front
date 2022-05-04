import React, { useContext, useState } from "react";
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
import { AppContext } from "../../../components/AppContext";
import PasswordChecklist from "react-password-checklist";
import PasswordCheckList from "../../../components/PasswordCheckList";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
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
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm new password is required"),
});

export const ChangePassword = () => {
  // useState para mostrar y ocultar contraseña
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { objLogin } = useContext(AppContext);
  const { user, username, email, serialNumber } = objLogin;

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      changePass(values);
    },
  });

  const changePass = (event) => {
    const payload = {
      name: user,
      username: username,
      email: email,
      serialNumber: serialNumber,
      currentPassword: event.currentPassword,
      newPassword: event.newPassword,
      confirmNewPassword: event.confirmNewPassword,
    };

    axios
      .post("/auth/changePassword", payload)
      .then((res) => {
        if (res.data.ok === false) {
          console.log(res);
        } else {
          console.log("Cambios realizados con exito");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [show, setShow] = useState(false);

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
            {/* Icono de change password */}
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

              <Grid container>
                <Grid xs={11.9}>
                  <TextField
                    focused
                    type="password"
                    margin="normal"
                    // fullWidth
                    style={{ width: "97.5%" }}
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
                </Grid>
                <Grid xs={0.1} alignSelf='center'>
                  <IconButton
                  title='Click here to know the password requirements.'
                  style={{width: '10%' }}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    <HelpIcon />
                  </IconButton>

                </Grid>


              </Grid>


              <TextField
                focused
                type="password"
                margin="normal"
                // fullWidth
                style={{ width: "97.5%" }}
                id="newPassword"
                label="New password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={(e) => {
                  formik.handleChange(e);
                  setPassword(e.target.value);
                }}
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
                type="password"
                margin="normal"
                // fullWidth
                style={{ width: "97.5%" }}
                id="confirmNewPassword"
                label="Confirm new password"
                name="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={(e) => {
                  formik.handleChange(e);
                  setPasswordAgain(e.target.value);
                }}
                error={
                  formik.touched.confirmNewPassword &&
                  Boolean(formik.errors.confirmNewPassword)
                }
                helperText={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                }
              />

              {show && (
                <PasswordCheckList
                  password={password}
                  passwordAgain={passwordAgain}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "97.5%" }}
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
