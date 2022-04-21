import React, {useContext} from 'react';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { AppContext } from "../../../components/AppContext";
import { Box, Container, Divider, Grid, Paper } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img_avatar from "../../../assets/images/avatar.jpg";
import banner from "../../../assets/images/banner.png"


import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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

// Icons
import ShareIcon from '@mui/icons-material/Share';
import ImageIcon from '@mui/icons-material/Image';
import AbcIcon from '@mui/icons-material/Abc';
import {PhotoCamera} from '@mui/icons-material';

// import { Carousel } from 'antd';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon, TwitterIcon } from 'react-share';

import Row from './ChildrenComponent/Row.js'


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
      <Stack direction="row" spacing={2} marginY={-11.5} justifyContent="center" overflow='inherit'>
        <Avatar        
          alt="Remy Sharp"          
          src={
            objLogin.profileData &&
            (objLogin.profileData.base64ProfilePhoto !== null ||
              objLogin.profileData.base64ProfilePhoto === "")
              ? `${process.env.REACT_APP_API_URL}/render/image/${objLogin.profileData.base64ProfilePhoto}`
              : img_avatar
          }
          sx={{ width: 150, height: 150 }}
        />
      </Stack>
      
      
      {/* Body 1 */}
      <div style={ { backgroundColor: '#F4F4F4', width: '100%', maxWidth: '100%' } }>
        <Container >
          <Grid container>  
            <Grid item xs={12} marginTop={14} marginBottom={8} textAlign='center'>                
              <Grid>
                {/* Username and description */}
                <Grid>
                  <Typography variant="h4" gutterBottom component="div">
                    {objLogin.user}
                  </Typography>
                  <Typography variant="overline" display="block" gutterBottom>
                    Hola mundo!
                  </Typography>
                </Grid>
                {/* Buttons */}
                <Stack  spacing={2} justifyContent='center'>
                        
                        <Grid>                      
                          <Button fullWidth sx={ { width: 250 } } variant="outlined" color='inherit' startIcon={<ShareIcon />}>
                            Custom URL
                          </Button>
                        </Grid>
                        <Grid>
                          <Button fullWidth sx={ { width: 250 } } variant="outlined" color='inherit' startIcon={<ImageIcon />}>
                            Marketing Test
                          </Button>
                        </Grid>
                        <Grid>
                          <Button fullWidth sx={ { width: 250 } } variant="outlined" color='inherit' startIcon={<AbcIcon />}>
                            Custom Test
                          </Button>
                        </Grid>
                        <Grid>
                          <Button fullWidth sx={ { width: 250 } } variant="outlined" color='inherit' startIcon={<AbcIcon />}>
                            Hola mundo
                          </Button>
                        </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Container> 
      </div>

      {/* Body 2 */}
      <div style={ { backgroundColor: '#fff', width: '100%' } }>
        <Container >
          <Grid container>
            {/* Body 1.1 */}
            <Grid item xs={6} marginY={8}>

            {/* Inicio de formulario para editar información. */}
            {/* <ThemeProvider theme={theme}> */}
        <Container component="main" maxWidth="xs">

              {/* Input: Full name */}
              <Grid>
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
              </Grid>
              
              {/* Input: Profile photo / Banner photo */}
              <Grid marginTop={2} container justifyContent='space-around'>

                <Grid>
                  <Grid textAlign='center'>
                    <Typography variant='overline' marginBottom={4}>Profile Photo</Typography>
                  </Grid>
                  <Stack direction="row" spacing={2} marginBottom={4}>
                    <Grid>
                      <Grid>
                        <Button variant="outlined" endIcon={<PhotoCamera />}>
                          Choose File
                        </Button>
                      </Grid>
                      <Grid textAlign='center' marginTop={1}>
                    <Typography variant='overline' color='InactiveCaptionText'>No file selected.</Typography>
                      </Grid>
                    </Grid>                
                    
                  </Stack>
                </Grid>

                <Grid>
                  <Grid textAlign='center'>
                    <Typography variant='overline' marginBottom={4}>Banner Photo</Typography>
                  </Grid>
                  <Stack direction="row" spacing={2}>
                    <Grid>
                      <Grid>
                        <Button variant="outlined" endIcon={<PhotoCamera />}>
                          Choose File
                        </Button>
                      </Grid>
                      <Grid textAlign='center' marginTop={1}>
                    <Typography variant='overline' color='InactiveCaptionText'>No file selected.</Typography>
                      </Grid>
                    </Grid>                
                    
                  </Stack>
                </Grid>

              </Grid>
              

              {/* Input: Profile bio */}
              <Grid>
                <Grid marginBottom={2}>
                  <Typography variant='overline'>Profile Bio</Typography>
                </Grid>
                <TextField
                  id="standard-multiline-static"
                  label="Bio"
                  fullWidth
                  multiline
                  rows={4}              
                  variant='outlined'
                />
              </Grid>

              {/* Social media selector */}
              <Row />            
            
          
        </Container>
      {/* </ThemeProvider> */}
            </Grid>

            {/* Body 1.2 */}
            <Grid item xs={6} marginY={8}>

            {/* Inicio de formulario para editar información. */}
            {/* <ThemeProvider theme={theme}> */}
        <Container component="main" maxWidth="xs">             
              
              {/* Input: Custom text */}
              <Grid >
                <Grid marginBottom={2}>
                  <Typography variant='overline'>Custom text</Typography>
                </Grid>
                <TextField
                  id="standard-multiline-static"
                  label="Text"
                  fullWidth
                  multiline
                  rows={4}              
                  variant='outlined'
                />
              </Grid>

              {/* Input: Whatsapp */}
              <Grid marginBottom={2}>
                <Typography variant='overline'>Whatsapp</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Whatsapp"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus                  
                />
              </Grid>

              {/* Input: Instagram */}
              <Grid marginBottom={2}>
                <Typography variant='overline'>Instagram</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Instagram"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus                  
                />
              </Grid> 

              {/* Input: Facebook */}
              <Grid marginBottom={2}>
                <Typography variant='overline'>Facebook</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Facebook"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus                  
                />
              </Grid>  
              
              
              
            
          
        </Container>
      
            </Grid>

            {/* Body 1.3 - Buttons */}
            <Grid item xs={12}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2}}
              >
                Save changes
              </Button>
              <Button
                type="submit"
                fullWidth
                color='inherit'
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Clear Data
              </Button>
            </Grid>             

          </Grid>
        </Container> 
      </div>     
      

    {/* Footer */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '40vh',
      }}
    >
      <CssBaseline />      
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm" >
          <Typography variant="body1" >
            <Container >
              <Grid container>
                <Grid item xs={12}> 
                  <Grid textAlign='center'>                    
                    
                      <FacebookShareButton url='https://profile.stdicompany.com/edit-profile'>
                        <FacebookIcon round={true}></FacebookIcon>
                      </FacebookShareButton>
                      
                      <TwitterShareButton sx={{ marginX: 40 }}>
                        <TwitterIcon round={true}></TwitterIcon>
                      </TwitterShareButton>                    
                    
                      <WhatsappShareButton>
                        <WhatsappIcon round={true}></WhatsappIcon>
                      </WhatsappShareButton>                   
                    
                    
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Typography>
          
        </Container>
      </Box>
    </Box>      
    </>
  );
};

