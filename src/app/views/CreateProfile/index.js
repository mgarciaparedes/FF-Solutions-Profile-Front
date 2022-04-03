import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import history from '../../../components/History';
import { useFormik } from "formik";
import * as yup from "yup";

// import React, { useState } from "react";
// import { Form, InputGroup, Button, Alert } from "react-bootstrap";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import history from "../../../components/History";
// import LogoWhite from "../../../assets/images/logo-white.png";
// import * as Icon from "react-bootstrap-icons";
// import axios from "axios";
// import helpers from "../../../components/Helpers";

// const { swalOffBackend } = helpers;

// const schema = Yup.object({
//   fullName: Yup.string().required("Fullname is required."),
//   userName: Yup.string()
//     .required("Username is required.")
//     .min(8, "Username must have at least 8 digits.")
//     .max(35, "Username must have a maximum of 35 digits.")
//     .matches(/^\S*$/, "Username can't have spaces.")
//     .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,"Username can't have special symbols"),
//   email: Yup.string()
//     .required("Email is required.")
//     .email("Invalid email format."),
//   serialNumber: Yup.string()
//     .required("Serial Number is required."),
//     //.matches(/^[1-9]+[0-9]*$/, "Only numbers."),
//   password: Yup.string()
//     .required("Password is required.")
//     .min(8, "PAssword must have at least 8 digits.")
//     .matches(/^\S*$/, "Password can't have spaces."),
//   passwordConfirm: Yup.string()
//     .required("Confirm password is required.")
//     .when("password", {
//       is: (val) => (val && val.length > 0 ? true : false),
//       then: Yup.string().oneOf(
//         [Yup.ref("password")],
//         "Both password need to be the same"
//       ),
//     }),
// });

// export const CreateProfile = () => {
//   const [disabledButton, setDisabledButton] = useState(false);

//   const onSubmit = (event) => {
//     setDisabledButton(true);

//     const { userName, fullName, email, serialNumber, password } = event;

//     const payload = {
//       name: fullName,
//       username: userName,
//       email: email,
//       serialNumber: serialNumber,
//       password: password,
//     };

//     axios
//       .post(`/users/saveNewUser`, payload)
//       .then((res) => {
//         setDisabledButton(false);
//         const { ok, msg } = res.data;
//         if (ok && msg === "User created succesfully.") {
//           Swal.fire({
//             title: "Success",
//             text: "Your profile account have been created.",
//             icon: "success",
//             confirmButtonText: "Ok",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               history.push("/login");
//             } else {
//               history.push("/login");
//             }
//           });
//         }
//       })
//       .catch((e) => {
//         /*Sí los servicios están OFF, retornamos este swal*/
//         if (e.response === undefined) {
//           swalOffBackend();
//           setDisabledButton(false);
//           return 1;
//         }

//         /*Si ocurre algo en el request, retoramos esto*/
//         const { msg, ok } = e.response.data;
//         if (!ok) {
//           Swal.fire({
//             title: "Error",
//             text: msg,
//             icon: "error",
//             confirmButtonText: "Try again",
//           });
//           setDisabledButton(false);
//         }
//       });
//   };

  // return (
  //   <>
      {/* <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="card-sign-up">
            <div className="card-header">
              <h3 className="text-center">Create your profile</h3>
            </div>
            <div className="card-body">
              <Formik
                validationSchema={schema}
                // onSubmit={(values, { resetForm }) => {
                //   onSubmit(values);
                //   resetForm({ values: null });
                // }}
                onSubmit={onSubmit}
                initialValues={{
                  fullName: "",
                  userName: "",
                  email: "",
                  serialNumber: "",
                  password: "",
                  passwordConfirm: "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                    name="addServiceData"
                    id="addServiceData"
                  >
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.PersonFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Type here your full name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        isValid={!!touched.fullName && !errors.fullName}
                        isInvalid={!!errors.fullName && !!touched.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          profile.stdicompany.com/
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="username"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        isValid={!!touched.userName && !errors.userName}
                        isInvalid={!!errors.userName && !!touched.userName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.userName}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.At />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Example: johndoe@example.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={!!touched.email && !errors.email}
                        isInvalid={!!errors.email && !!touched.email}
                        className="lowercase"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.Upc />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Type the serial number"
                        name="serialNumber"
                        value={values.serialNumber}
                        onChange={handleChange}
                        isValid={!!touched.serialNumber && !errors.serialNumber}
                        isInvalid={
                          !!errors.serialNumber && !!touched.serialNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.serialNumber}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.KeyFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={!!touched.password && !errors.password}
                        isInvalid={!!errors.password && !!touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.KeyFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        isValid={
                          !!touched.passwordConfirm && !errors.passwordConfirm
                        }
                        isInvalid={
                          !!errors.passwordConfirm && !!touched.passwordConfirm
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirm}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={disabledButton === true}
                        block
                      >
                        <div className="d-flex d-inline-block justify-content-center">
                          <span
                            className="spinner-border spinner-border-sm mt-1 mr-2"
                            role="status"
                            style={{
                              display:
                                disabledButton === true
                                  ? "inline-block"
                                  : "none",
                            }}
                            aria-hidden="true"
                          ></span>
                          {disabledButton === true
                            ? " Loading, please wait..."
                            : "Create Account"}
                        </div>
                      </Button>
                    </InputGroup>

                    <Alert variant="info">
                      <Icon.ExclamationTriangleFill /> By registering you agree
                      to our <a href="/">privacy policy and terms of service</a>
                      .
                    </Alert>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Already have an account? &nbsp;
                <a href="/login">Click here</a>
                &nbsp; to login.
              </div>
              <div className="d-flex justify-content-center text-white">
                Don't have an account? &nbsp;
                <a href="/create-profile"> Sign Up</a>
              </div>
              {/* <div className="d-flex justify-content-center">
                <a href="/">Privacy Policy and Terms of Service</a>
              </div> */}
            {/*</div>
          </div>
        </div>
      </div> */}
      {/* <div>Estamos en Create Profile</div>
    </>
  );
}; */}



//Constante con el formato de validación para cada campo-------------------------------------------

const validationSchema = yup.object({
  fullName: yup.string()    
    .required("Full name is required"),
  userName: yup
    .string("Enter your Username")    
    .required("Username is required"),
  email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  serialNumber: yup.number()
    .typeError("Must be just numbers.")
    .integer("The serial number can't include a decimal point.")
    .required('Serial number is required.'),
  password: yup.string()    
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirmation password is required")
});


//Footer de Formulario createProfile--------------------------------------------------------
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}></Typography>
  );
}

//Se crea el tema de plantilla preconfigurado por Material UI para obtener el diseño de CreateProfile------
const theme = createTheme();


//Inicio de componente-----------------------------------------------------------------------------------------
export const CreateProfile = ()=>{

//Configurar los valores a evaluar por el formulario-----------------------------------------------------------

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      serialNumber: "",
      password: "",
      confirmPassword: ""      
    },
    validationSchema: validationSchema, //Se le pasa la costante de formato de cada campo--------------
    onSubmit: (values) => {
      //Si llega acá es porque pasó todas las validaciones, le enviamos los values
      //de cada campo en el formulario, se obtienen con el nombre de cada campo.      
      signUp(values); 
    },
  });

  // Funcion que envia objeto de valores al console.---------------------------------------------------
  const signUp = (values) => {
    console.log(values);    
  }; 
   

  return (

    // Inicio de Tema proporcionado por template de Material UI
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

    {/* Icono de candado en CreateProfile */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

    {/* Titulo de CreateProfile */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

      {/* Inicio de formulario */}

              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>

            {/*Campo FullName*/}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="off"
                      name="fullName"
                      // required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      // autoFocus
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                      helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                  </Grid>
                  
            {/*Campo userName*/}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      // required
                      fullWidth
                      id="userName"
                      label="profile.stdicompany.com/username"
                      name="userName"
                      autoComplete="family-name"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      error={formik.touched.userName && Boolean(formik.errors.userName)}
                      helperText={formik.touched.userName && formik.errors.userName}
                    />
                  </Grid>

            {/*Campo email*/}
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

            {/*Campo serial number*/}
                  <Grid item xs={12}>
                    <TextField                      
                      fullWidth
                      id="serialNumber"
                      label="Type the serial number"
                      name="serialNumber"                      
                      value={formik.values.serialNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.serialNumber && Boolean(formik.errors.serialNumber)}
                      helperText={formik.touched.serialNumber && formik.errors.serialNumber}
                    />
                  </Grid>

            {/* Campo de password */}
                  <Grid item xs={6}>
                    <TextField                      
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}                      
                    />
                  </Grid>

            {/* Campo de confirm password*/}
                  <Grid item xs={6}>
                    <TextField                      
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}                      
                    />
                  </Grid>

            {/* Checkbox para recibir promociones y actualizaciones. */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
            {/* Boton de registrarse */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

            {/* Link de cuando se tiene una cuenta. */}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={()=>{ history.push('/login') }} variant="body2" sx={{ cursor: 'pointer' }}>
                      Already have an account? Sign in
                    </Link>                
                  </Grid>
                </Grid>

              </form>            
        </Box>
          
        
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}