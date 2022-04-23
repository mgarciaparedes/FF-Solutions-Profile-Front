import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import helpers from "../../../components/Helpers";
import { AppContext } from "../../../components/AppContext";
import history from "../../../components/History";
import {
  Avatar,
  Stack,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Modal,
  Backdrop,
  Fade,
  LinearProgress,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import img_avatar from "../../../assets/images/avatar.jpg";
import banner from "../../../assets/images/banner.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { maxWidth } from "@mui/system";

//Imágenes por default si el cliente no tiene imágenes guardadas
import userImage from "../../../assets/images/default-user-image.png";
import BannerImage from "../../../assets/images/default-user-banner.jpg";

// Icons
import { PhotoCamera } from "@mui/icons-material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";

// import { Carousel } from 'antd';

//Importaciones de Componentes Hijos
import Row from "./ChildrenComponent/Row.js";
import NoDynamicForm from "./ChildrenComponent/NoDynamicForm";

//Importación de la librería QR
const QRCode = require("qrcode.react");

// Tema para input's
const theme = createTheme();

const {
  convertStringWithPlus,
  copyToClipboard,
  copyTextToClipboard,
  // shareLink,
} = helpers;

//Estilo modal cierre de sesión
const styleModal = {
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

export const SetupProfile = () => {
  const [existentProfile, setExistentProfile] = useState(true);
  const [nameState, setNameState] = useState("");
  const [bioState, setBioState] = useState("");
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil
  const [sessionOver, setSessionOver] = useState(false);
  const [profileData, setProfileData] = useState([]); //Este de momento no se usa
  const [customImage, setCustomImage] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [usernameLinked, setUsernameLinked] = useState("");

  //Con estas variables valido el tamaño de las imágenes
  const [imgProfileSize, setImgProfileSize] = useState(0);
  const [imgBannerSize, setImgBannerSize] = useState(0);

  /*Con estos estados manejamos cuando adjuntamos una imagen la convertimos en base64 para pintarlas
   *en la vista. También cuando el servicio(getProfileUserData) se encarga de mostrar
   *la ruta de la imagen*/
  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");
  const [gallery, setGallery] = useState("");

  // const [sendNotifications, setSendNotifications] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  //para enviar al módulo de changePassword
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [email, setEmail] = useState("");

  /*Estas variables la usamos para manejar los estados de la foto y el perfil que vamos a subir.
  No van en formato64. El mismo javascrip se encarga de mandarlos en binario para que sean leídas en
  el backend.*/
  const [imgProfileToUpload, setImgProfileToUpload] = useState("");
  const [imgBannerToUpload, setImgBannerToUpload] = useState("");

  //constante para abrir y cerrar modal live preview
  const [openLivePreview, setOpenLivePreview] = useState(false);

  const { objLogin, logoutContext } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("/users/getProfileUserData")
      .then((res) => {
        const { ok, msg, username } = res.data;
        if (
          ok === true &&
          msg === "User is registered but doesn't have any profile saved."
        ) {
          setExistentProfile(false); //Diferenciar si se le pega al servicio save
          setLoadingProfileData(false);
          //Esto pasa en caso de que exista el usuario registrado pero no tenga ningún perfil asociado
          //tiene que guardar el username para wue al momento de revisar su QR, copiar el link o al terminar
          //de hacer su primer registro se pueda redirigir hacia su username
          setUsername(username);
          // Swal.fire({
          //   title: "Hi, welcome to STDI profiles",
          //   text: "Save your data to see your profile ;)",
          //   icon: "info",
          //   confirmButtonText: "OK",
          // });

          alert("Bienvenido");

          setBase64ImgProfile(userImage);
          setBase64ImgBanner(BannerImage);
        } else {
          setExistentProfile(true); //Diferenciar si se le pega al servicio update
          setNameState(res.data.data.profileFullName);
          setBioState(res.data.data.profileBio);
          setUsername(res.data.username);
          setProfileData(res.data.data.socialMedia);
          setIsLinked(res.data.data.isLinked);
          setUsernameLinked(res.data.data.usernameLinked);
          setGallery(res.data.gallery);
          setCustomImage(res.data.customImage);

          /*De no estar guardada la ruta de la imagen, mostramos un icono en fondo gris*/
          if (res.data.data.base64ProfilePhoto === "") {
            setBase64ImgProfile(userImage);
          } else {
            /*Sí el registro viene con algo, lo pintamos con la key de s3 de amazon*/
            setBase64ImgProfile(
              `${process.env.REACT_APP_API_URL}/render/image/${res.data.data.base64ProfilePhoto}`
            );
          }

          /*Aplicamos la misma validación, verificamos que haya sido guarda la ruta del banner en S3.*/
          if (res.data.data.base64BannerPhoto === "") {
            setBase64ImgBanner(BannerImage);
          } else {
            /*Sí ya hay una key, pintamos el banner adjuntado y guardado en DB*/
            setBase64ImgBanner(
              `${process.env.REACT_APP_API_URL}/render/image/${res.data.data.base64BannerPhoto}`
            );
          }

          setRows(res.data.data.socialMedia); //Aquí guardo si es que el profile tiene alguna red social
          setLoadingProfileData(false);
          //setSendNotifications(res.data.data.sendNotifications);

          //para enviar al ChangePassword
          setName(res.data.name);
          setEmail(res.data.email);
          setSerialNumber(res.data.serialNumber);
        }
      })
      .catch((error) => {
        setExistentProfile(false);
        setLoadingProfileData(false);
        setSessionOver(true);

        alert("Error");
      });
  }, []);

  //Esta función va a guardar cada vez que se cambie algo en los campos de RRSS
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  //Declaro el estado del arreglo inicial que va a guardar las RRSS seleccionadas
  const [rows, setRows] = useState([]);

  //Función que guarda una fila nueva cada vez que se seleccione una opción nueva de RRSS
  const handleOnAdd = (e) => {
    //Aquí valido que si eligen choose your media no se agregue nada
    if (e.target.value !== "") {
      //el campo CustomURL va a guardar otro dato -> el nombre del link
      //Entonces dependiendo de la red social elegida digo si va a guardar ese dato extra o no
      if (e.target.value === "CustomURL" || e.target.value === "CustomText") {
        setRows(
          rows.concat({
            socialNetwork: e.target.value,
            profile: "",
            linkName: "",
          })
        );
      } else {
        setRows(
          rows.concat({
            socialNetwork: e.target.value,
            profile: "",
          })
        );
      }
    }
  };

  //Función que elimina una fila determinada.
  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const handleNameChange = (e) => {
    setNameState(e.target.value);
  };

  const handleBioChange = (e) => {
    setBioState(e.target.value);
  };

  //Función que convierte imágenes a base64
  const reader = new FileReader();
  reader.onloadend = () => {
    // use a regex to remove data url part
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    setBase64ImgProfile(`data:image/jpeg;base64,${base64String}`);
  };

  const reader2 = new FileReader();
  reader2.onloadend = () => {
    // use a regex to remove data url part
    const base64String2 = reader2.result
      .replace("data:", "")
      .replace(/^.+,/, "");

    setBase64ImgBanner(`data:image/jpeg;base64,${base64String2}`);
  };

  return (
    <>
      <Navbar />
      {/* Body 2 */}
      <div style={{ backgroundColor: "#fff", width: "100%" }}>
        <Container>
          <Grid container>
            {/* Body 1.1 */}
            <Grid item xs={12} marginTop={8}>
              {/* Inicio de formulario para editar información. */}
              {/* <ThemeProvider theme={theme}> */}
              
                <NoDynamicForm />

                {/* Social media selector */}
                
              
              <Container>
              <Row />
              </Container>
              {/* </ThemeProvider> */}
            </Grid>

            {/* Body 1.2 - Buttons */}
            <Grid item xs={12} marginBottom={1}>
              <Button type="submit" fullWidth variant="contained">
                Save changes
              </Button>
            </Grid>
            <Grid xs={5.5}>
              <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={()=> setOpenLivePreview(true)}
              >
                {/* <RemoveRedEyeTwoToneIcon sx={{ fontSize: 15 }} /> */}
                Live Preview 
              </Button>
            </Grid>
            <Grid xs={1}></Grid>
            <Grid xs={5.5}>
              <Button
                type="submit"
                fullWidth
                color="inherit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Clear Data
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/*Modal de Progress Bar cargando mientras consume el servicio getProfile */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loadingProfileData || sessionOver}
        onClose={!loadingProfileData}
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={loadingProfileData}>
          <Box sx={styleModal}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 30,
              }}
            >
              <AccountCircleTwoToneIcon color="info" sx={{ fontSize: 70 }} />
            </Typography>
            {/* <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              Plase wait ;)
            </Typography> */}
            <LinearProgress sx={{ mt: 2 }} />
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: "center" }}
              gutterBottom
            >
              Loading your info...
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/*Modal de Live Preview de Profile */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openLivePreview}
        onClose={!openLivePreview}
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={openLivePreview}>
          <Box sx={styleModal}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 30,
              }}
            >
              <Button
                type="button"
                fullWidth
                color="inherit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={()=>setOpenLivePreview(false)}
              >
                Close Live Preview
              </Button>
            </Typography>
            
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
