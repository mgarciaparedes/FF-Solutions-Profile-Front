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
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../../components/AppContext";

//Importación de íconos redes sociales
import YoutubeIcon from "../../../../assets/svg/youtube.svg";
import InstagramIcon from "../../../../assets/svg/instagram.svg";
import TwitterIcon from "../../../../assets/svg/twitter.svg";
import FacebookIcon from "../../../../assets/svg/facebook.svg";
import LinkedinIcon from "../../../../assets/svg/linkedin.svg";
import SnapchatIcon from "../../../../assets/svg/snapchat.svg";
import AppleMusicIcon from "../../../../assets/svg/apple-music.svg";
import CashappIcon from "../../../../assets/svg/cashapp.svg";
// import SoundcloudIcon from "../../../../assets/svg/soundcloud.svg";
import SpotifyIcon from "../../../../assets/svg/spotify.svg";
import TiktokIcon from "../../../../assets/svg/tiktok.svg";
import VenmoIcon from "../../../../assets/svg/venmo.svg";
import PaypalIcon from "../../../../assets/svg/paypal.svg";
import MapPinIcon from "../../../../assets/svg/locationmap.svg";
import EmailIcon from "../../../../assets/svg/mail.svg";
import PhoneIcon from "../../../../assets/svg/phone.svg";
import WhatsappIcon from "../../../../assets/svg/whatsapp.svg";
import TelegramIcon from "../../../../assets/svg/telegram.svg";
import GoFundMeIcon from "../../../../assets/svg/gofundme.svg";
import TwitchIcon from "../../../../assets/svg/twitch.svg";
import OnlyFansIcon from "../../../../assets/svg/onlyfans.svg";
import DiscordIcon from "../../../../assets/svg/discord.svg";
import HousePartyIcon from "../../../../assets/svg/houseparty.svg";
import SmsIcon from "../../../../assets/svg/sms.svg";
import WebsiteIcon from "../../../../assets/svg/website.svg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: "center",
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
          <Container sx={{ mt: 3 }}>
            <Box sx={{ flexGrow: 1 }} mr={2} ml={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>
                    <a
                      // sx={{
                      //   outline: "none !important",
                      //   boxShadow: "none",
                      // }}
                      target="_blank"
                      component="a"
                      href="http://www.google.com/"
                    >
                      <img src={InstagramIcon} alt="test" />
                    </a>
                  </Item>
                </Grid>
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
