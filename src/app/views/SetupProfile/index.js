import React, {useContext} from 'react';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { AppContext } from "../../../components/AppContext";

export const SetupProfile = () => {
  const { objLogin } = useContext(AppContext);

  return (
    <>
      <Navbar />

      
      <Footer />
    </>
  );
};

