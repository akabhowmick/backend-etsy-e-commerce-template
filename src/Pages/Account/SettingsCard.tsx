// IMPORTS
import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ShowAndEditProfile } from "./ShowAndEditProfile";
import { ShowAndEditAddress } from "./ShowAndEditAddress";

const tabs = ["Account", "Address", "Order History"];

export const SettingsCard = () => {
  const [tabValue, setTabValue] = useState(tabs[0]);
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
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
      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "40vh" },
            textAlign: { xs: "center", md: "start" },
          }}
        >
          {/* FIELDS */}
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              {/* //! pass whether or not editable */}
              {tabValue === tabs[0] && <ShowAndEditProfile />}
              {tabValue === tabs[1] && <ShowAndEditAddress />}
              {/* {tabValue === tabs[2] && <ShowOrderHistory />} */}
              {/* BUTTON */}
              <Grid container justifyContent={{ xs: "center", md: "flex-end" }} item xs={6}>
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={(e) => changeButton(e)}
                >
                  {edit.isEdit === false ? "UPDATE" : "EDIT"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
};
