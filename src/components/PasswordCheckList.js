import React from "react";
import PasswordChecklist from "react-password-checklist";
import { Alert, AlertTitle } from "@mui/material";

const PasswordCheckList = ({ password, passwordAgain }) => {
  return (    
      <Alert variant="outlined" severity="warning" sx={{ marginTop: 2 }}>
        <AlertTitle>Password must contain:</AlertTitle>
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={password}
          valueAgain={passwordAgain}
          onChange={(isValid) => {}}
        />
      </Alert>    
  );
};

export default PasswordCheckList;
