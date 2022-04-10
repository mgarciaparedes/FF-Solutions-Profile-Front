import React, { useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockResetIcon from '@mui/icons-material/LockReset';
import history from '../../../components/History.js'
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Alert from '@mui/material/Alert';

// const { swalOffBackend } = helpers;




  
const theme = createTheme();

const schema = Yup.object({
    email: Yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
});

export const ForgotPassword = () => {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: schema,
        onSubmit: (values)=>{
            sendCode(values)
        }
    });

    const sendCode = (values) => {        
        console.log(values);

        const { email } = values;

        const payload = {
        email: email,
        };

        axios
            .post('auth/forgotPassword', payload)
            .then( (resp) => {
                
                const { msg, ok } = resp.data;

                if (ok && msg === 'Password was sent to your email, please follow the steps to login again.') {
                    <Alert severity="success" color="info">
                        Holaaaaa
                    </Alert>
                    alert('Holaaaa')
                    history.push('/login')
                    
                }

                
            })
            

        


      };

//   const [disabledButton, setDisabledButton] = useState(false);

//   const onSubmit = (event) => {
//     setDisabledButton(true);

//     const { email } = event;
//     const payload = {
//       email: email,
//     };

//     axios
//       .post(`auth/forgotPassword`, payload)
//       .then((res) => {
//         const { ok, msg } = res.data;

//         if (ok && msg === "Password was sent to your email, please follow the steps to login again.") {
//           setDisabledButton(false);

//           Swal.fire({
//             title: "Verification code was sent!",
//             text: msg,
//             icon: "info",
//             confirmButtonText: "OK",
//           }).then((result) => {
            
//             if (result.isConfirmed) {
//               history.push("/login");
//             } else {
//               history.push("/login");
//             }

//           });

//         } else {

//             setDisabledButton(false);

//             Swal.fire({
//               title: "Error",
//               text: "An error occurred while trying to change the password",
//               icon: "error",
//               confirmButtonText: "Try again",
//             });
//         }

//         setDisabledButton(false);
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
//     });
    
//   };

  return (
    <>
      {/* <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="card-login">
            <div className="card-header">
              <h3>Forgot Password?</h3>
              <div className="d-flex justify-content-end social_icon">
                <img className="logo-login" src={LogoWhite} alt="Logo" />
              </div>
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
                  email: "",
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
                          <Icon.PersonBoundingBox />
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup>
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
                            : "Send verification code"}
                        </div>
                      </Button>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Back to Login? &nbsp;
                <a href="/login"> Click Here</a>
              </div>
              <div className="d-flex justify-content-center text-white">
                Don't have an account? &nbsp;
                <a href="/create-profile"> Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/">Privacy Policy and Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                
                <Box
                sx={{
                    marginTop: 17,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                {/* Icono de forgot password */}
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', height: 50, width: 50 }}>
                    <LockResetIcon fontSize='large'/>
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
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Send verification code
                    </Button>

                    <Grid container>
                    <Grid item xs>
                        <Link 
                        onClick={ ()=>{ history.push('/login') } }
                        variant="body2"
                        sx={{cursor: 'pointer'}}>
                            Back to Login?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link 
                        onClick={ ()=>{ history.push('/create-profile') } }
                        variant="body2"
                        sx={{cursor: 'pointer'}}>
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                    </Grid>
                </form>
                {/* </Box> */}

                </Box>            
            </Container>
        </ThemeProvider>
    </>
  );
};
