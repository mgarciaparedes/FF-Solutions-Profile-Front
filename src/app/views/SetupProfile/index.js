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

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { SocialIcon } from 'react-social-icons';
// import { Carousel } from 'antd';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon, TwitterIcon } from 'react-share';


// Tema para input's
const theme = createTheme();

// Tema para icono de camara fotografica
const Input = styled('input')({
  display: 'none',
});

// Inicio del dropdown
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Instagram',
  'Whatsapp',
  'Snapchat',
  'Youtube',
  'Facebook',
  'Soundcloud',
  'Linkedin',
  'Telegram',
  'TikTok',
  'Twitter',
  'Spotify',
  'Apple Music',
  'Venmo',
  'CashApp',
  'Phone Number',
  'Paypal',
  'GoFundMe',
  'Twitch',
  'Discord',
  'HouseParty',
  'OnlyFans',
  'Address',
  'Email',
  'SMS',
  'Website',
  'CustomURL',
  'CustomText',
  'Embed Youtube Video',
];
//Fin de dropdown 

// Carousel
// const contentStyle = {
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

export const SetupProfile = () => {

  const { objLogin } = useContext(AppContext);

  // Inicio de funcion para dropdown
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
   // Fin de funcion para dropdown

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
              <Grid marginY={3}>
                <Grid marginBottom={2}>
                  <Typography variant='overline'>Social Media Channel</Typography>
                </Grid>
                <FormControl sx={{  width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Divider />
              
              {/* Input: Custom text */}
              <Grid marginY={3}>
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
                color='warning'
                variant="contained"
                sx={{ mt: 1, mb: 7 }}
              >
                Clear Data
              </Button>
              
            
          
        </Container>
      </ThemeProvider>
            </Grid>            

          </Grid>
        </Container> 
      </div>

      <div style={ { backgroundColor: '#fff', width: '100%', maxWidth: '100%' } }>
        <Container >
          <Grid container>           

            <Grid item xs={12} marginTop={15}>

            {/* <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel> */}

            </Grid>

          </Grid>
        </Container> 
      </div>
      
      {/* <div style={ { backgroundColor: '#F4F4F4', width: '100%', height: 50 } }>
        <Grid>
          <InstagramIcon color='blue'/>
        </Grid>
      </div> */}

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
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Container>
              <Grid container>
                <Grid item xs={12}>
                  <FacebookShareButton url='https://profile.stdicompany.com/edit-profile'>
                    <FacebookIcon round={true}></FacebookIcon>
                  </FacebookShareButton>
                  <TwitterShareButton>
                    <TwitterIcon round={true}></TwitterIcon>
                  </TwitterShareButton>
                  <WhatsappShareButton>
                    <WhatsappIcon round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                </Grid>
              </Grid>
            </Container>
          </Typography>
          
        </Container>
      </Box>
    </Box>

      {/* <Footer /> */}
    </>
  );
};

