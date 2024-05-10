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
        <Typography variant="h6" color="black" id="account-header">
          {`Welcome to your account ${user.firstName?.toString()} ${user.lastName?.toString()}`}
        </Typography>
      )}
      <SettingsCard />
    </Grid>
  );
};
