// IMPORTS
import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ShowAndEditProfile } from "./ShowAndEditProfile";
import { ShowAndEditAddress } from "./ShowAndEditAddress";
import { ShowOrderHistory } from "./ShowOrderHistory";

const tabs = ["Account", "Address", "Order History"];

export const SettingsCard = () => {
  const [tabValue, setTabValue] = useState(tabs[0]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
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
            {tabValue === tabs[0] && <ShowAndEditProfile />}
            {tabValue === tabs[1] && <ShowAndEditAddress />}
            {tabValue === tabs[2] && <ShowOrderHistory />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
