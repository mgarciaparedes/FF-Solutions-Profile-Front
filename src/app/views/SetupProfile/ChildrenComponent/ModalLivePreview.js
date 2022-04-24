import React from "react";
import { Modal, Fade, Box, Typography, Button } from "@mui/material";

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

const ModalLivePreview = ({
  openLivePreview,
  setOpenLivePreview,
  handleCloseLivePreview,
}) => {
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
