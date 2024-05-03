import "./Account.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { SettingsCard } from "./SettingsCard";
import { useUserContext } from "../../providers/UserProvider";

export const Account = () => {
  const { user } = useUserContext();
  
  return (
    <Grid>
      {user.id !== 0 && (
        <Typography variant="h6" color="black">
          Welcome to your account
          {user.firstName?.toUpperCase() + " " + user.lastName?.toUpperCase()}
        </Typography>
      )}
      <SettingsCard />
    </Grid>
  );
};
