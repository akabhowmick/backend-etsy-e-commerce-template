import { Button, Grid } from "@mui/material";

import { useAuthContext } from "../../providers/AuthProvider";
import { useUserContext } from "../../providers/UserProvider";

import { useNavigate } from "react-router-dom";
import { initialUserValues } from "../../utils/HelpfulText";

export const Logout = () => {
  const { logOutUser } = useAuthContext();
  const { setUser } = useUserContext();

  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logOutUser();
    setUser({ ...initialUserValues });
    navigate("/");
  };
  return (
    <Grid item xs={6}>
      <Button
        sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
        component="button"
        size="large"
        variant="contained"
        color="error"
        onClick={() => handleLogOutClick()}
      >
        {" "}
        LOGOUT
      </Button>
    </Grid>
  );
};
