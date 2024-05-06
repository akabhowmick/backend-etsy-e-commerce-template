// IMPORTS
import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { Button, Grid } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ShowAndEditProfile } from "./ShowAndEditProfile";
import { ShowAndEditAddress } from "./ShowAndEditAddress";
import { ShowOrderHistory } from "./ShowOrderHistory";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { initialUserValues } from "../../utils/HelpfulText";
import { useUserContext } from "../../providers/UserProvider";

const tabs = ["Account", "Address", "Order History"];

export const SettingsCard = () => {
  const { logOutUser } = useAuthContext();
  const { setUser } = useUserContext();
  const [tabValue, setTabValue] = useState(tabs[0]);
  const navigate = useNavigate();
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleLogOutClick = () => {
    logOutUser();
    setUser({ ...initialUserValues });
    navigate("/");
  };

  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <br></br>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabs.map((tab) => {
          return <Tab value={tab} label={tab} key={tab} />;
        })}
      </Tabs>
      <Divider></Divider>

      {/* MAIN CONTENT CONTAINER */}
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: "40vh" },
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {/* FIELDS */}
        <Grid>
          <Grid container direction={{ xs: "column", md: "row" }} columnSpacing={5} rowSpacing={3}>
            <div id="account-container">
              {tabValue === tabs[0] && <ShowAndEditProfile />}
              {tabValue === tabs[1] && <ShowAndEditAddress />}
              {tabValue === tabs[2] && <ShowOrderHistory />}
            </div>
          </Grid>
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
        </Grid>
      </CardContent>
    </Card>
  );
};
