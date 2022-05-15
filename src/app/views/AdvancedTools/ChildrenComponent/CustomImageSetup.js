import { Modal, Fade, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Gallery from "../../Profile/ChildrenComponent/Gallery";
import { AppContext } from "../../../../components/AppContext";

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

const CustomImageSetup = ({
  openCustomImageSetup,
  handleCloseCustomImageSetup,
}) => {
  const [gallery, setGallery] = useState(null);

  const { objLogin, setCustomImageContext } =
    useContext(AppContext);

  const payload = {
      username: objLogin.username /*Puede ser el usuario o el nro de serial*/,
    };

  useEffect(() => {
    axios
      .post("/users/usernameData", payload)
      .then((res) => {

        const { ok, msg, data, email, gallery, customImage, active, username } =
          res.data;          
          
          setGallery(gallery)
      })

      
    })

  return (
    <Modal
      open={openCustomImageSetup}
      onClose={handleCloseCustomImageSetup}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Fade in={openCustomImageSetup}>
        <Box sx={styleModal}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Gallery gallery={gallery} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomImageSetup;
