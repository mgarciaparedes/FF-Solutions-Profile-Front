import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import imagotipo from "../assets/images/imagotipo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        // minHeight: '40vh',
      }}
    >
      <CssBaseline />
      {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container> */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            // theme.palette.mode === "light" ? theme.palette.grey[200] : "#000",
            theme.palette.mode === "light" ? "#000" : "#000",
        }}
      >
        <Container maxWidth="sm">
          <Link
            target="_blank"
            href={
              "https://smjurgenklaric.pro.typeform.com/to/orcmOwvQ?utm_campaign=TF-PRINCIPAL-BL&utm_source=Instagram&utm_medium=Social&utm_term=OPT&utm_content=Generalista&typeform-source=l.instagram.com"
            }
          >
            <Box
              component="img"
              sx={{
                // height: 200,
                width: 0.7,
              }}
              alt="logo"
              src={imagotipo}
            />
            {/* <Copyright /> */}
          </Link>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
