import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Modal,
  Drawer,
  List,
  LinearProgress,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Backdrop,
  Fade,
  Zoom,
  Fab,
} from "@mui/material";
// Importaciones de iconos
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import PrivacyTipSharpIcon from "@mui/icons-material/PrivacyTipSharp";
import HandshakeIcon from "@mui/icons-material/HandshakeTwoTone";

import { AppContext } from "./AppContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img_avatar from "../assets/images/avatar.jpg";
import history from './History.js'

const Sidebar = () => {
  const [state, setState] = useState({
    left: false,
  });

  const [open, setOpen] = useState(false);
  const [openProgressBar, setOpenProgressBar] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Función que abre último modal que muestra progress bar y mensae de cerrando sesión
  const handleOpenProgressBar = () => {
    setOpenProgressBar(true);
    setTimeout(() => {
      logoutContext();
      handleCloseProgressBar();
    }, 2000);
  };

  const handleCloseProgressBar = () => setOpenProgressBar(false);

  //Estilo modal ventana de confirmación
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "2px",
    boxShadow: 24,
    p: 3,
  };

  //Estilo modal cierre de sesión
  const styleModalProgressBar = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  const { logoutContext, objLogin } = useContext(AppContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack direction="row" spacing={2} marginY={2} justifyContent="center">
        <Avatar
          alt="Remy Sharp"
          src={
            objLogin.profileData &&
            (objLogin.profileData.base64ProfilePhoto !== null ||
              objLogin.profileData.base64ProfilePhoto === "")
              ? `${process.env.REACT_APP_API_URL}/render/image/${objLogin.profileData.base64ProfilePhoto}`
              : img_avatar
          }
          sx={{ width: 66, height: 66 }}
        />
      </Stack>
      <Typography variant="h6" textAlign="center" marginBottom={1}>
        {objLogin.user}
      </Typography>

      <Divider />

      {/* Iconos en el sidebar */}
      <List>
        {[
          "Home",
          "Set Up Profile",
          "Advanced tool",
          "Change Password",
          "Help",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 && <HomeRoundedIcon />}
              {index === 1 && <SettingsApplicationsSharpIcon onClick={ ()=>{ history.push('/edit-profile') } }/>}
              {index === 2 && <ConstructionRoundedIcon />}
              {index === 3 && <LockResetRoundedIcon />}
              {index === 4 && <PrivacyTipSharpIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        <ListItem button onClick={() => handleOpen()}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign off"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      {/*Modal de Confirmación de Cerrar Sesión */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styleModal}>
            <Typography sx={{ textAlign: "center" }}>
              <InfoOutlinedIcon color="info" sx={{ fontSize: 70 }} />
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              Info
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Wanna go out?
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  {" "}
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      handleOpenProgressBar();
                    }}
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/*Modal de Progress Bar cierre de sesión */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openProgressBar}
        onClose={handleCloseProgressBar}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProgressBar}>
          <Box sx={styleModalProgressBar}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 25
              }}
            >
              <HandshakeIcon color="info" sx={{ fontSize: 70 }} />
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              See u next time
            </Typography>
            <LinearProgress sx={{ mt: 2 }} />
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: "center" }}
              gutterBottom
            >
              Signing off...
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default Sidebar;
