import React from 'react';
import { Button, TextField, Grid, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const FourthView = ({ setView }) => {
  return (
    <>
      {/* Titulo de FourthView */}
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Fourth View
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        Fourth view
      </Typography>

      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Button
            sx={{ mt: 2, mb: 2 }}
            onClick={() => setView(3)}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Previous
          </Button>
        </Grid>
        {/* <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => setView(4)}
          >
            Submit
          </Button>
        </Grid> */}
      </Grid>
      </>
  );
}

export default FourthView