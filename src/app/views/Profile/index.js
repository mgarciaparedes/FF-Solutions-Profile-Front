import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
// import { AppContext } from "../../../components/AppContext";
// import history from "../../../components/History";

export const Profile = ({ location }) => {
  const { pathname } = location;
  const username = pathname.replace("/", "");

  // Valores iniciales
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil

  const payload = {
    username: username /*Puede ser el usuario o el nro de serial*/,
  };

  useEffect(() => {
    axios
      .post("/users/usernameData", payload)
      .then((res) => {
          setLoadingProfileData(false);
        const { ok, msg, data, email, gallery, customImage } = res.data;

        if(ok && msg === "Username Profile Data found."){
            alert("Todo ok");

        }else{
        }
      })
      .catch((e) => {
        setLoadingProfileData(false);
        if (e.response === undefined) {
        //   alert("Error1");
          return false;
        }
        const { msg, ok } = e.response.data;
        if (!ok) {
        //   alert("Error2");
          return false;
          //   Swal.fire({
          //     title: "Error",
          //     text: msg,
          //     icon: "error",
          //     confirmButtonText: "Try again",
          //   }).then((result) => {
          //     if (result.isConfirmed) {
          //       history.push("/login");
          //     } else {
          //       history.push("/login");
          //     }
          //   });
        }
      });
  }, []);

  return <div>Profile {username}</div>;
};
