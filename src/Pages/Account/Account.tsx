import "./Account.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { SettingsCard } from "./SettingsCard";
import { useUserContext } from "../../providers/UserProvider";

export const Account = () => {
  const { user } = useUserContext();
  return (
    <Grid>
      <Typography variant="h6">{user.firstName + user.lastName}</Typography>
      <Typography color="text.secondary"> Welcome to your account</Typography>
      <SettingsCard />
    </Grid>
  );
};
