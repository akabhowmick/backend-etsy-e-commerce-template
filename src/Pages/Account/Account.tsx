import "./Account.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { SettingsCard } from "./SettingsCard";
import { useUserContext } from "../../providers/UserProvider";

export const Account = () => {
  const { userInfo } = useUserContext();

  return (
    <Grid>
      {userInfo.id !== 0 && (
        <Typography variant="h6" color="black" id="account-header">
          {`Welcome to your account ${userInfo.firstName?.toString()} ${userInfo.lastName?.toString()}`}
        </Typography>
      )}
      <SettingsCard />
    </Grid>
  );
};
