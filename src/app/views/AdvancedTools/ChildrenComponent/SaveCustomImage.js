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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import * as Yup from "yup";
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

const SaveCustomImage = ({
  openSaveCustomImage,
  handleCloseSaveCustomImage,
}) => {
  const [saveCustomImageButton, setSaveCustomImageButton] = useState(false);
  const [customImageButtonName, setCustomImageButtonName] = useState("");
  const [customImagesToRenderInModal, setCustomImagesToRenderInModal] =
    useState([]);
  const [amountInputsGallery, setAmountInputsGallery] = useState(0);
  const [arrayToMapInputs, setArrayToMapInputs] = useState([]);
  const [arrayInputsValues, setArrayInputsValues] = useState([]);
  const [customImage, setCustomImage] = useState([]);
  const [showModalAmountInputs, setShowModalAmountInputs] = useState(false);
  const [selecter, setSelecter] = React.useState("");

  //Variables para modal que muestra el input text y los inputs files
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Variables para modal que muestra la cantidad a seleccionar de archivos
  const handleCloseModalAmountInputs = () => setShowModalAmountInputs(false);
  const showModalInputs = () => setShowModalAmountInputs(true);

  const { objLogin, setCustomImageContext } = useContext(AppContext);

  const handleChange = (event) => {
    setSelecter(event.target.value);
  };

  useEffect(() => {
    setCustomImagesToRenderInModal(objLogin.customImage);
    console.log(objLogin.customImage);
  }, []);

  const schemaModalAmount = Yup.object({
    imagesNumber: Yup.string().required("Number of images are required"),
  });

  const checkFilesFormat = (arrayInputsValues) => {
    //Esta función recorre el arreglo de imágenes buscando
    //archivos adjuntados que tengan formato de imágenes
    //así validamos que los archivos subidos sean solo imágenes
    for (var i = 0; i < arrayInputsValues.length; i++) {
      if (
        arrayInputsValues[i].type === "image/jpeg" ||
        arrayInputsValues[i].type === "image/jpg" ||
        arrayInputsValues[i].type === "image/png"
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const saveCustomImage = () => {
    //console.log(arrayURLValues);
    setSaveCustomImageButton(true);

    //Primero voy a validar si los formatos de los archivos están correctos
    //enviándole el arreglo de Files seleecionados a esta función
    const checkAttachedFiles = checkFilesFormat(arrayInputsValues);

    //Aquí valido que hayan sido seleccionado todos los archivos
    if (
      arrayInputsValues.some(
        (elem) => elem.length === 0 || elem.name === "filename"
      )
    ) {
      setSaveCustomImageButton(false);
      console.log(
        "Some files to upload are missing, please tap in every button to upload all the files."
      );
      //Aquí valido que el tamaño de las imágenes a subir no sobrepasen los 5MB.
    } else if (arrayInputsValues.some((elem) => elem.size >= 5000000)) {
      setSaveCustomImageButton(false);
      console.log("Images should not exceed 5MB.");
    } else if (!checkAttachedFiles) {
      setSaveCustomImageButton(false);
      console.log("Files format must be .jpg, .jpeg y .png");
    } else if (customImageButtonName === "") {
      setSaveCustomImageButton(false);
      console.log("Custom Image Button must have a name");
    } else {
      let formData = new FormData();
      formData.append("customImageActive", true);
      formData.append("customImageButtonName", customImageButtonName);
      for (var x = 0; x < customImage.length; x++) {
        formData.append("customImage", customImage[x]);
      }
      axios
        .post("/users/saveNewCustomImage", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSaveCustomImageButton(false);

          const { ok, msg, customImage } = res.data;
          if (ok && msg === "Custom Image created succesfully.") {
            console.log("Custom Image created succesfully.");
            handleClose();
            //Esta función guarda en el AppContext los botones restantes
            //resultado de eliminar el custom Image Button previamente seleccionado
            setCustomImageContext(customImage);
            setCustomImagesToRenderInModal(customImage);
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          setSaveCustomImageButton(false);
          console.log("We are sorry, an error occurred.");
        });
    }
  };

  const RenderInputsCustomImage = (event) => {
    //Primero, cerramos el modal que está a la vista
    handleCloseModalAmountInputs();

    //Segundo, calculamos el valor del arreglo según el primer select
    const amount = event.imagesNumber;

    if (amount > 0) {
      setAmountInputsGallery(amount);

      let inputs = [];
      let inputsValues = [];
      for (let i = 0; i < amount; i++) {
        inputs.push(1);
        inputsValues.push(new File([""], "filename"));
      }
      setArrayToMapInputs(inputs);
      setArrayInputsValues(inputsValues);
      setCustomImage(inputsValues);
    }

    //Luego mostramos el segundo modal con la cantidad de inputs
    handleShow();
  };

  return (
    <>
      <Modal
        open={openSaveCustomImage}
        onClose={handleCloseSaveCustomImage}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={openSaveCustomImage}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Set up a custom image
            </Typography>

            <Divider />
            <Box marginY={5} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Inputs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selecter}
                  label="Inputs"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SaveCustomImage;
