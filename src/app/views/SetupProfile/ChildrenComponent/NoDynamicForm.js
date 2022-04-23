import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Alert,
  Input,
  Button,
  Container
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CameraAltTwoToneIcon from "@mui/icons-material/CameraAltTwoTone";

const NoDynamicForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      {/* Input: Full name */}
      <Grid marginBottom={1}>
        <Alert variant="outlined" severity="info">
          <b>*</b> is for mandatory info.
        </Alert>
      </Grid>
      <Grid>
        {/* <Grid marginBottom={-2}>
    <Typography variant="overline">Profile Full Name</Typography>
    </Grid> */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullname"
          label="Full Name"
          name="fullname"
          autoComplete="fullname"
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      {/* Input: Profile photo / Banner photo */}
      <Grid container justifyContent="space-around">
        <Grid>
          <Grid textAlign="center">
            <Typography variant="overline">Profile Photo</Typography>
          </Grid>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="outlined" component="span">
              Choose File &nbsp;&nbsp;
              <CameraAltTwoToneIcon />
            </Button>
          </label>
          <Grid textAlign="center">
            <Typography variant="overline" color="InactiveCaptionText">
              No file selected.
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Grid textAlign="center">
            <Typography variant="overline" marginBottom={4}>
              Banner Photo
            </Typography>
          </Grid>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="outlined" component="span">
              Choose File &nbsp;&nbsp;
              <CameraAltTwoToneIcon />
            </Button>
          </label>
          <Grid textAlign="center">
            <Typography variant="overline" color="InactiveCaptionText">
              No file selected.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Input: Profile bio */}
      <Grid marginTop={1}>
        <TextField
          id="standard-multiline-static"
          label="Bio"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Container>
  );
};

export default NoDynamicForm;
