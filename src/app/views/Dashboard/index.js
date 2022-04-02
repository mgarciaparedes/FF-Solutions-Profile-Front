// import React, { useState, useContext } from "react";
// import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { styled } from '@mui/material/styles';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
// import autoBind from "react-autobind";
import ButtonBase from '@mui/material/ButtonBase';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@mui/material";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar";
import banner from '../../../assets/images/banner.png'
import banner2 from '../../../assets/images/banner2.jpg'
import banner3 from '../../../assets/images/banner3.jpg'


// import { Alert, Carousel } from "react-bootstrap";
// import { SideNavigation } from "../../../components/SideNavigation";
// import { AppContext } from "../../../components/AppContext";
// import logoImage from "../../../assets/images/logo-white.png";
// import banner from "../../../assets/images/Banner.jpg";
// import banner2 from "../../../assets/images/Banner2.png";
// import * as Icon from "react-bootstrap-icons";

const images = [
  {
    url: banner3,
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: banner,
    title: 'Stay tunned',
    width: '30%',
  },
  {
    url: banner2,
    title: 'Set up your Profile',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export const Dashboard = () => {
//   const { objLogin } = useContext(AppContext);
//   const [show, setShow] = useState(true);
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

// CAROUSEL BASICO
// const contentStyle = {    
//   height: '400px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// }; 
  return (
    <>
    <Navbar />

    <Box marginTop={8.6} sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>


    {/* Carousel basico. */}
      {/* <Grid container justifyContent='center'>
        <Grid item xs={12} >
          <Carousel autoplay>
            <Grid justifyItems='center'>
              <Grid style={contentStyle}>
                1                
              </Grid>
            </Grid>        
            <Grid>
              <Grid style={contentStyle}>
                2                
              </Grid>
            </Grid>
            <Grid>
              <Grid style={contentStyle}>
                3                
              </Grid>
            </Grid>  
          </Carousel>

        </Grid>
      </Grid>            */}
    {/* Carousel basico. */}



      {/* <div className="container mt-3 pr-4">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">            
            <SideNavigation />
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Alert variant="warning" className="mb-1 pb-1 mt-3">
                <p>
                  <Icon.PersonCircle size={20} /> &nbsp; Hi there,{" "}
                  <b>{objLogin.user}</b>.
                </p>
              </Alert>
              <div className="text-center mt-3">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={banner}
                      alt="First slide"
                    />

                    <Carousel.Caption>
                      <h3>Set up your Profile</h3>
                      <p>
                        Tap in the button on top to display setup options.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={banner2}
                      alt="First slide"
                    />

                    <Carousel.Caption>
                      <h3>
                      Stay tunned!
                      </h3>
                      <p>
                        We share news and updates in this section.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
              <Alert variant="info mt-3 pb-1">
                <p>
                  <strong> Wanna learn more?</strong>{" "}
                  <a target="_blank" href="https://www.stdicompany.com/">
                    Tap here to see more
                  </a>
                </p>
                <p>
                  <strong> Wanna contact us?</strong>{" "}
                  <a target="_blank" href="https://www.stdicompany.com/contact">
                    Tap here to contact us
                  </a>
                </p>
              </Alert>
              
            </div>
          </div>
        </div>
      </div>

      <div className="alert-information">
        <div className="d-flex justify-content-center">
          <a
            className="text-white font-bold"
            href="https://shop.stdicompany.com/"
            target="_blank"
          >
            STDI rocks, right? Tap here to get yours.
          </a>
        </div>
      </div>

      <div className="pt-3 text-white">
        <div className="d-flex justify-content-center">
          <a href="https://www.stdicompany.com/">
            <img className="img-profile-logo" src={logoImage} />
          </a>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <h5 className="font-bold">STDI Company</h5>
        </div>
        <div className="d-flex justify-content-center">
          <h6>All features registered &copy;</h6>
        </div>
      </div> */}       
                          
    <Footer />
    </>
  );

}
