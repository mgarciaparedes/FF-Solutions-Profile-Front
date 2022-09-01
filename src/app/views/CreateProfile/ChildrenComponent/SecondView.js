import React from "react";
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

//Constante con el formato de validación para cada campo-------------------------------------------
const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(50, "Full name should be maximum 50 characters."),
});

const SecondView = ({ setView, name, setName }) => {
  //Configurar los valores a evaluar por el formulario-----------------------------------------------------------

  const formik = useFormik({
    initialValues: {
      fullName: name,
    },
    validationSchema: validationSchema, //Se le pasa la costante de formato de cada campo--------------
    onSubmit: (values) => {
      setName(values.fullName);
      setView(3);
    },
  });

  return (
    <>
      {/* Titulo de CreateProfile */}
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Tell us about yourself
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        We'll use this to personalize your experience
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {/*Campo FullName*/}
          <Grid item xs={12} sm={12}>
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
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 1}}>
          <Grid item xs={6}>
            <Button
              sx={{ mt: 2, mb: 2 }}
              onClick={() => setView(1)}
              startIcon={<KeyboardBackspaceIcon />}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              // disabled={loading}
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

export default SecondView;
