import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../../../components/History";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordCheckList from "../../../components/PasswordCheckList";

import FirstView from "./ChildrenComponent/FirstView";
import SecondView from "./ChildrenComponent/SecondView";
import ThirdView from "./ChildrenComponent/ThirdView";
import FourthView from "./ChildrenComponent/FourthView";

//Footer de Formulario createProfile--------------------------------------------------------
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

//Se crea el tema de plantilla preconfigurado por Material UI para obtener el diseño de CreateProfile------
// const theme = createTheme();

//Inicio de componente-----------------------------------------------------------------------------------------
export const CreateProfile = () => {
  //Setear valor del paso 1
  const [view, setView] = useState(1);

  //Valores paso 1
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Valores del paso 2
  const [name, setName] = useState("");

  return (
    // Inicio de Tema proporcionado por template de Material UI
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Icono de candado en CreateProfile */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Titulo de CreateProfile */}
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign up
        </Typography>

        {/* Inicio de formulario */}
        {view === 1 ? (
          <FirstView
            setView={setView}
            setUsername={setUsername}
            setEmail={setEmail}
            setPass={setPassword}
          />
        ) : view === 2 ? (
          <SecondView
            setView={setView}
            username={username}
            email={email}
            password={password}
          />
        ) : view === 3 ? (
          <ThirdView />
        ) : (
          <FourthView />
        )}
        {view}

        {/* {view > 1 ? (
          <button onClick={() => setView(view - 1)}>Previous</button>
        ) : null} */}
        {/* {view < 4 ? (
          <button onClick={() => setView(view + 1)}>Next</button>
        ) : null} */}
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
    // </ThemeProvider>
  );
};
