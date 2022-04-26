import React, { useEffect, useContext } from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  Grid,
  Paper,
  Container
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { AppContext } from "../../../../components/AppContext";
import Image from "material-ui-image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  overflow: "scroll", //para que funcione el scroll
  boxShadow: 24,
  p: 3,
  margin: "auto",
};

const ModalLivePreview = ({
  openLivePreview,
  setOpenLivePreview,
  handleCloseLivePreview,
  imgProfile,
  imgBanner,
  // imgBannerToUpload,
  // imgProfileToUpload,
  nameState,
  bioState,
}) => {
  const { objLogin, logoutContext } = useContext(AppContext);
  // useEffect(() => {
  //   console.log(imgProfile);
  // }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openLivePreview}
      onClose={handleCloseLivePreview}
      // closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
    >
      <Fade in={openLivePreview}>
        <Box sx={styleModal}>
          <Box
            component="img"
            sx={{
              height: 200,
              width: 1,
            }}
            alt="banner image"
            src={imgBanner}
          />
          <Stack
            direction="row"
            spacing={2}
            marginY={2}
            justifyContent="center"
            sx={{
              marginTop: "-60px",
              "&::before": {
                marginTop: "5px",
                position: "absolute",
                fontSize: "10px",
                content: '"Loading..."',
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={imgProfile}
              sx={{
                width: 100,
                height: 100,
              }}
            />
          </Stack>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              fontWeight: "bold",
            }}
          >
            {nameState}
          </Typography>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            {bioState}
          </Typography>

          {/*Botones Redes Sociales*/}
          <Container>
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
              <Item>xs=6 md=8</Item>
              </Grid>
              <Grid item xs={4}>
              <Item>xs=6 md=8</Item>
              </Grid>
              <Grid item xs={4}>
              <Item>xs=6 md=8</Item>
              </Grid>
            </Grid>
          </Box>
          </Container>

          {/*Botón Cerrar Live Preview*/}
          <Typography
            sx={{
              textAlign: "center",
              mt: 10,
            }}
          >
            <Button
              type="button"
              fullWidth
              color="info"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => setOpenLivePreview(false)}
            >
              Close Live Preview
            </Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalLivePreview;
