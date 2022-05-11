import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import {
  Container,
  Typography,
  FormGroup,
  Box,
  Alert,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  LinearProgress,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { AppContext } from "../../../components/AppContext";
import CollectionsIcon from "@mui/icons-material/Collections";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSnackbar } from "notistack";

//Importación de componentes hijos
import GpsNotifications from "./ChildrenComponent/GpsNotifications";

const theme = createTheme();

export const AdvancedTools = () => {
  const { objLogin, setGPSNotificationsSelectedContext } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     console.log(objLogin);
  //   }, []);

  return (
    <>
      {/*Barra de tareas */}
      <Navbar />

      {/*En caso de que se esté consumiendo algún servicio se activa este loading en página completa*/}
      {loading ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          {/* <CircularProgress color="inherit" /> */}
          <LinearProgress
            sx={{ mt: 2, zIndex: (theme) => theme.zIndex.drawer + 1 }}
            color="secondary"
          />
          <Typography
            variant="caption"
            display="block"
            sx={{ textAlign: "center" }}
            gutterBottom
          >
            Saving your changes...
          </Typography>
        </Backdrop>
      ) : null}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 9,
              display: "flex",
              flexDirection: "column",
              //   alignItems: "center",
            }}
          >
            <Alert variant="outlined" severity="info">
              In this area you can add more advanced tools such as customizing
              your profile buttons, adding a photo gallery, and sub functions
              that will be explained when activating each function.
            </Alert>
          </Box>
          <Box
            sx={{
              marginTop: 3,
              //   display: "flex",
              //   flexDirection: "column",
              //   alignItems: "center",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {/* Componente hijo para activar o desactivar las notificacions de geolocalización */}
              <GpsNotifications setLoading={setLoading} />

              <Divider component="li" />

              <ListItem>
                <ListItemText primary="Connect Account" secondary="Disabled" />
                {/* <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sendNotifications === true ? true : false}
                        onChange={(e) => {
                          sendEmailNotifications(e);
                        }}
                      />
                    }
                    label=""
                  />
                </FormGroup> */}
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Gallery Status"
                  secondary="Test"
                />
                {/* <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sendNotifications === true ? true : false}
                        onChange={(e) => {
                          sendEmailNotifications(e);
                        }}
                      />
                    }
                    label=""
                  />
                </FormGroup> */}
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gallery Images"
                  secondary="Checkout your gallery images"
                />
                <Button variant="outlined">
                  <CollectionsIcon />
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gallery Setup"
                  secondary="Select your images and make a gallery for your profile"
                />
                <Button variant="outlined">
                  <TouchAppIcon />
                </Button>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Custom Images"
                  secondary="Checkout your custom images button"
                />
                <Button variant="outlined">
                  <ViewListIcon />
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Custom Image Setup"
                  secondary="Make a brand new custom image button"
                />
                <Button variant="outlined">
                  <TouchAppIcon />
                </Button>
              </ListItem>
            </List>

            {/* <FormControlLabel
                disabled
                control={<Switch />}
                label="Disabled"
              /> */}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
