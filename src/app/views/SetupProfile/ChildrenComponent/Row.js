import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

// Inicio del dropdown
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Instagram",
  "Whatsapp",
  "Snapchat",
  "Youtube",
  "Facebook",
  "Soundcloud",
  "Linkedin",
  "Telegram",
  "TikTok",
  "Twitter",
  "Spotify",
  "Apple Music",
  "Venmo",
  "CashApp",
  "Phone Number",
  "Paypal",
  "GoFundMe",
  "Twitch",
  "Discord",
  "HouseParty",
  "OnlyFans",
  "Address",
  "Email",
  "SMS",
  "Website",
  "CustomURL",
  "CustomText",
  "Embed Youtube Video",
];
//Fin de dropdown

const Row = () => {
  // Inicio de funcion para dropdown
  const [personName, setPersonName] = useState([]);
  const [Ss, setSs] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    console.log(event.target.value);

    if (event.target.value == "Instagram") {
      console.log("Esto es IG");
    } else if (
      event.target.value == "Whatsapp" ||
      event.target.value == "Instagram"
    ) {
      console.log(" Esto es WS ");
      console.log(" Esto es IG ");
    }
  };
  // Fin de funcion para dropdown

  const [socialMedia, setSocialMedia] = React.useState("");

  // const handleChange = (event) => {
  //   setSocialMedia(event.target.value);
  //   console.log(event.target.value);

  //   if (event.target.value == 10) {
  //     console.log("This is ten");
  //   } else if (event.target.value == 20) {
  //     console.log("This is twenty");
  //   }
  // };

  return (
    <>
      {/* <Grid marginY={3}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={socialMedia}
                label="Age"
                onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Grid> */}

      <Grid marginY={3}>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="demo-multiple-checkbox-label">Social Media Channel</InputLabel>

          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Social Media Channel" />}
            renderValue={(selected) => selected.join(", ")}
            // MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default Row;
