import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import history from "../../../components/History";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  Grid,
  Paper,
  Container,
  Skeleton,
} from "@mui/material";

//Componentes hijos
import ModalError from "./ChildrenComponent/ModalError";


export const Profile = ({ location }) => {
  const { pathname } = location;
  const username = pathname.replace("/", "");

  // Valores iniciales
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil

  //Hooks modal error al cargar
  const [openModalError, setOpenModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleCloseModalError = () => setOpenModalError(false);

  const payload = {
    username: username /*Puede ser el usuario o el nro de serial*/,
  };

  const error404 = () => {
    history.push("/error-404");
  };

  useEffect(() => {
    axios
      .post("/users/usernameData", payload)
      .then((res) => {
        setLoadingProfileData(false);
        const { ok, msg, data, email, gallery, customImage } = res.data;

        if (ok && msg === "Username Profile Data found.") {
        //   alert("Todo ok");
        } else {
          setOpenModalError(true);
        }
      })
      .catch((e) => {
        setLoadingProfileData(false);
        if (e.response === undefined) {
          //   alert("Error1");
          setOpenModalError(true);
          return false;
        }
        const { msg, ok } = e.response.data;
        if (!ok && msg === "User does not exist.") {
          //   alert("Error2");
          setErrorMessage(msg);
          setOpenModalError(true);
          return false;
        }
      });
  }, []);

  return (
    <>
      <Grid>
        <Typography>profile {username}</Typography>
      </Grid>
      
      {/*Modal Error*/}
      <ModalError 
      openModalError={openModalError}
      errorMessage={errorMessage}
      history={history}
      />
    </>
  );
};
