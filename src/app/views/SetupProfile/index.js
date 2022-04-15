import React, {useContext} from 'react';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { AppContext } from "../../../components/AppContext";
import { Box, Container, Divider, Grid } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img_avatar from "../../../assets/images/avatar.jpg";
import banner from "../../../assets/images/banner.png"


import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { maxWidth } from '@mui/system';

// Tema para input's
const theme = createTheme();

// Tema para icono de camara fotografica
const Input = styled('input')({
  display: 'none',
});


export const SetupProfile = () => {
  const { objLogin } = useContext(AppContext);

  return (
    <>
      <Navbar />

      {/* Header: Imagen de STDI */}      
      <div>
        <img src={banner} style={ { width: '100%', height: 500,  } }/>
      </div>
      
      {/* Avatar */}
      <Stack direction="row" spacing={2} marginY={-11.5} justifyContent="center">
        <Avatar
          alt="Remy Sharp"
          src={
            objLogin.profileData &&
            (objLogin.profileData.base64ProfilePhoto !== null ||
              objLogin.profileData.base64ProfilePhoto === "")
              ? `${process.env.REACT_APP_API_URL}/render/image/${objLogin.profileData.base64ProfilePhoto}`
              : img_avatar
          }
          sx={{ width: 170, height: 170 }}
        />
      </Stack>
      
      <div style={ { backgroundColor: '#F4F4F4', width: '100%' } }>
        <Container >
          <Grid container>

            <Grid item xs={12} marginTop={15}>
            {/* Inicio de formulario para editar información. */}
            <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {/* <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >           */}
            {/* <Box component="form"  noValidate sx={{ mt: 1 }}> */}
              {/* Input: Profile Full Name */}
              <Typography variant='overline'>Profile Full Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                marginBottom={4}
              />
              
              {/* Input: Profile photo */}
              <Grid marginY={4}>
                <Typography variant='overline' marginBottom={4}>Profile Photo</Typography>
                <Stack direction="row" spacing={2} marginBottom={4}>                
                  <Button variant="outlined" endIcon={<PhotoCamera />}>
                    Send
                  </Button>
                </Stack>
              </Grid>

              {/* Input: Banner photo */}
              <Grid >
                <Typography variant='overline' marginBottom={4}>Profile Photo</Typography>
                <Stack direction="row" spacing={2} marginBottom={4}>                
                  <Button variant="outlined" endIcon={<PhotoCamera />}>
                    Send
                  </Button>
                </Stack>
              </Grid>

              <Typography variant='overline'>Profile Bio</Typography><br />
              <TextField
                id="standard-multiline-static"
                label="Bio"
                fullWidth
                multiline
                rows={4}              
                variant="standard"
              /><br /><br />

              <Typography variant='overline'>Social Media Channel</Typography><br />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save changes
              </Button>
              <Button
                type="submit"
                fullWidth
                color='warning'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Clear Data
              </Button>
              
            {/* </Box> */}
          {/* </Box> */}
          
        </Container>
      </ThemeProvider>
            </Grid>            

          </Grid>
        </Container> 
      </div>

      <div style={ { backgroundColor: '#fff', width: '100%' } }>
        <Container >
          <Grid container>           

            <Grid item xs={12} marginTop={15}>
              Holaaaa
            </Grid>

          </Grid>
        </Container> 
      </div>
      
      <Footer />
    </>
  );
};

