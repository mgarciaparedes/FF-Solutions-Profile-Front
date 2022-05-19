import {
  Modal,
  Fade,
  Box,
  Typography,
  Grid,
  styled,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../../components/AppContext";
import ImageIcon from "@mui/icons-material/Image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const styleModalCustomText = {
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

const ItemCustomButton = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const responsiveCarouselImageProfile = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 10,
  },
};

const CustomImageSetup = ({
  openCustomImageSetup,
  handleCloseCustomImageSetup,
}) => {
  // const [customImage, setCustomImage] = useState([]);
  const [customImageToRender, setCustomImageToRender] = useState([]);

  //Hooks modal custom Image
  const [openModalCustomImage, setOpenModalCustomImage] = useState(false);
  const [modalCustomImageTitle, setModalCustomImagetitle] = useState("");
  const [modalCustomImagePhotos, setModalCustomImagePhotos] = useState([]);
  const handleCloseModalCustomImage = () => setOpenModalCustomImage(false);

  //función que maneja el open de modal custom image
  const handleOpenModalCustomImage = (text, imagesArray) => {
    setModalCustomImagetitle(text);
    setModalCustomImagePhotos(imagesArray);
    setOpenModalCustomImage(true);
  };

  const [ejemplo, setEjemplo] = useState([]);

  const { objLogin, setCustomImageContext } = useContext(AppContext);

  const payload = {
    username: objLogin.username /*Puede ser el usuario o el nro de serial*/,
  };


  useEffect(() => {
    // setCustomImage(objLogin.customImage);
    setCustomImageToRender(objLogin.customImage)    
  }, []);

  //Método para eliminar un custom button
  const deleteCustomImageButton = (id) => {
    console.log(id);

    const payload = {
      idCustomImage: id,
    };

    axios
      .post("/users/deleteCustomImageButton", payload)
      .then((res) => {        
        const { ok, msg, customImage } = res.data;
        if (ok && msg === "Custom Image Button was removed succesfully") {
          console.log("Custom image eliminado");
          setEjemplo(res)

          //Esta función guarda en el AppContext los botones restantes
          //resultado de eliminar el custom Image Button previamente seleccionado
          setCustomImageContext(customImage);
          setCustomImageToRender(customImage);
          // setCustomImage(customImage);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <>
      <Modal
        open={openCustomImageSetup}
        onClose={handleCloseCustomImageSetup}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={openCustomImageSetup}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Your list of custom images
            </Typography>

            <Divider />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>            

            {/*Botón CUSTOM IMAGE ---------------------------*/}
            {customImageToRender ? (
              <Box sx={{ flexGrow: 1 }} mr={2} ml={2}>
                <Grid container spacing={0}>
                  {customImageToRender.map((element, index) => (
                    <Grid item key={index} xs={12}>
                      {element.customImageActive === true ? (
                        <Grid>
                          <ItemCustomButton>
                            <Button
                              onClick={() =>
                                handleOpenModalCustomImage(
                                  element.customImageButtonName,
                                  element.arrayWithImagesURL
                                )
                              }
                            >
                              <ImageIcon color="info" sx={{ mr: 2 }} />{" "}
                              {element.customImageButtonName}
                            </Button>
                          </ItemCustomButton>
                          <Button
                            onClick={() =>                              
                              deleteCustomImageButton(
                                element.idCustomImageButton
                              )
                            }
                          >
                            Cerrar
                          </Button>

                        </Grid>
                      ) : null}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : null}
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalCustomImage}
        onClose={handleCloseModalCustomImage}
      >
        <Fade in={openModalCustomImage}>
          <Box sx={styleModalCustomText}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mt: 1, mb: 3, textAlign: "center" }}
            >
              {modalCustomImageTitle}
            </Typography>
            <Carousel
              ssr
              arrows
              itemClass="image-item"
              responsive={responsiveCarouselImageProfile}
              infinite={false}
              autoPlay={false}
              shouldResetAutoplay={false}
            >
              {modalCustomImagePhotos.map((element, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    window
                      .open(
                        `${process.env.REACT_APP_API_URL}/render/image/${element.image}`,
                        "_blank"
                      )
                      .focus()
                  }
                >
                  <Box
                    component="img"
                    sx={{
                      // height: 250,
                      width: "100%",
                    }}
                    alt="banner image"
                    src={`${process.env.REACT_APP_API_URL}/render/image/${element.image}`}
                  />
                </Button>
              ))}
            </Carousel>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleCloseModalCustomImage();
                    }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomImageSetup;