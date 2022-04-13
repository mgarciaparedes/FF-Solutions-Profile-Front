import React, {useContext} from 'react';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { AppContext } from "../../../components/AppContext";
import { Box, Container, Divider, Grid } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img_avatar from "../../../assets/images/avatar.jpg";


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
      <Grid textAlign='center' marginTop={9} sx={{ height: 200, backgroundColor: 'primary.dark' }}> Aqui va la imagen de STDI </Grid>
      
      {/* Avatar */}
      <Stack direction="row" spacing={2} marginY={-7.5} justifyContent="center">
        <Avatar
          alt="Remy Sharp"
          src={
            objLogin.profileData &&
            (objLogin.profileData.base64ProfilePhoto !== null ||
              objLogin.profileData.base64ProfilePhoto === "")
              ? `${process.env.REACT_APP_API_URL}/render/image/${objLogin.profileData.base64ProfilePhoto}`
              : img_avatar
          }
          sx={{ width: 120, height: 120 }}
        />
      </Stack>
      
      
      <Container>
        <Grid container marginTop={20}>

          <Grid item xs={6} sx={{ backgroundColor: 'white' }}>
          {/* Inicio de formulario para editar información. */}
          <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >          
          <Box component="form"  noValidate sx={{ mt: 1 }}>
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
            />
            
            {/* Input: Profile photo */}
            <Typography variant='overline'>Profile Photo</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>      
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <Button>
                    Choose file 
                  <PhotoCamera marginLeft={1}/>
                  </Button>
                </IconButton>
              </label>
            </Stack>

            {/* Input: Banner photo */}
            <Typography variant='overline'>Banner Photo</Typography>
            <Stack  spacing={2}>      
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <Button>
                    Choose file 
                  <PhotoCamera marginLeft={1}/>
                  </Button>
                </IconButton>
              </label>
            </Stack>

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
          </Grid>

          <Grid item xs={6}>
            Holaaaa
          </Grid>

        </Grid>
      </Container>      
      
      <Footer />
    </>
  );
};

