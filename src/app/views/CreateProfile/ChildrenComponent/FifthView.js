import React from "react";
import {
  Button,
  Alert,
  Grid,
  Typography,
} from "@mui/material";
import history from "../../../../components/History";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const FifthView = () => {
  return (
    <>
      {/* Titulo de ThirdView */}
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Congratulations!
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        We confirmed your payment.
      </Typography>

      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Alert severity="success" variant="outlined">
            Your subscription has been completed successfully. Now on you can
            log in and make your blacklion profile. Get it done!
          </Alert>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} textAlign="center">
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => history.push('/login')}
          >
            Go to login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FifthView;
