import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ThirdView = ({ setView }) => {
  return (
    <>
      {/* Titulo de ThirdView */}
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Choose your plan
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        We'll notice you when new plans arrived ;)
      </Typography>

      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Card sx={{ width: 1 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Blacklion Subscription
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right">
                <CheckBoxIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              $1 USD
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Per month, billed monthly
            </Typography>

            <Typography
              sx={{ fontSize: 14, mt: 2 }}
              color="text.secondary"
              gutterBottom
            >
              Make a brand new profile. Customize it to fit into your world.
            </Typography>

            <Accordion sx={{ mt: 3, boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography sx={{ fontSize: 14 }} color="text.secondary">This plan contains:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    - item 1
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    - item 2
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    - item 3
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>

      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Button
            sx={{ mt: 2, mb: 2 }}
            onClick={() => setView(2)}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => setView(4)}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ThirdView;
