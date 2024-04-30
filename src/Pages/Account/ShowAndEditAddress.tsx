import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useUserContext } from "../../providers/UserProvider";
import { CustomInput } from "./CustomInput";

export const ShowAndEditAddress = () => {
  const { user } = useUserContext();
  const [displayUser, setDisplayUser] = useState(user);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUser({ ...displayUser, [event.target.name]: event.target.value });
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
  };

  //! save should modify the current state

  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: "40vh" },
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {/* FIELDS */}
        <FormControl fullWidth>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Address</Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              inputProps={{
                id: "addressLine1",
                name: "Address Line 1",
                value: displayUser.userAddress?.addressLine1,
                onChange: (e) => changeField(e),
                title: "Address Line 1",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              inputProps={{
                id: "city",
                name: "city",
                value: displayUser.userAddress?.city,
                onChange: (e) => changeField(e),
                title: "City",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              inputProps={{
                id: "state",
                name: "state",
                value: displayUser.userAddress?.state,
                onChange: (e) => changeField(e),
                title: "State",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              inputProps={{
                id: "country",
                name: "country",
                value: displayUser.userAddress?.country,
                onChange: (e) => changeField(e),
                title: "Country",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              inputProps={{
                id: "zipCode",
                name: "zipCode",
                value: displayUser.userAddress?.zipCode,
                onChange: (e) => changeField(e),
                title: "Zip Code",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
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
        </FormControl>
      </CardContent>
    </Card>
  );
};
