import React, { useContext, useState, useEffect } from "react";
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
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { AppContext } from "../../../components/AppContext";
import CollectionsIcon from "@mui/icons-material/Collections";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ViewListIcon from '@mui/icons-material/ViewList';

const theme = createTheme();

export const AdvancedTools = () => {
  const { objLogin, setGPSNotificationsSelectedContext } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [sendNotifications, setSendNotifications] = useState(
    objLogin.sendNotifications
  );

  //   useEffect(() => {
  //     console.log(objLogin);
  //   }, []);

  //   const changeGPSNotificationsStatus = (isChecked) => {
  //     setLoading(true);

  //     const payloadGPSNotifications = {
  //       username: objLogin.username,
  //       sendNotifications: isChecked,
  //     };

  //     axios
  //       .post("/users/activateGPSNotifications", payloadGPSNotifications)
  //       .then((res) => {
  //         //console.log(res.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //       });
  //   };

  const sendEmailNotifications = (e) => {
    //alert(e.target.checked);
    setSendNotifications(e.target.checked);
    setGPSNotificationsSelectedContext(e.target.checked);
    // changeGPSNotificationsStatus(e.target.checked);
  };

  return (
    <>
      <Navbar />

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
              <ListItem>
                <ListItemText
                  primary="GPS Notifications"
                  secondary={
                    sendNotifications === true ? "Enabled" : "Disabled"
                  }
                />
                <FormGroup>
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
                </FormGroup>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Connect Account" secondary="Disabled" />
                <FormGroup>
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
                </FormGroup>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Gallery Status"
                  secondary={
                    sendNotifications === true ? "Enabled" : "Disabled"
                  }
                />
                <FormGroup>
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
                </FormGroup>
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
