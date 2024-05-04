import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useUserContext } from "../../providers/UserProvider";
import { CustomInput } from "./CustomInput";
import { initialAddress } from "../../utils/HelpfulText";

export const ShowAndEditAddress = () => {
  const { user, setUser, updateUserInfoThroughAccount } = useUserContext();
  const [originalAddressValues, setOriginalAddressValues] = useState(initialAddress);

  useEffect(() => {
    setOriginalAddressValues({ ...user.userAddress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      userAddress: { ...user.userAddress, [event.target.name]: event.target.value },
    });
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: false,
  });

  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    if (
      !edit.isEdit &&
      JSON.stringify(originalAddressValues) !== JSON.stringify(user.userAddress)
    ) {
      updateUserInfoThroughAccount(!edit.isEdit);
    }
  };

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
                name: "addressLine1",
                value: user.userAddress?.addressLine1,
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
                value: user.userAddress?.city,
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
                value: user.userAddress?.state,
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
                value: user.userAddress?.country,
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
                value: user.userAddress?.zipCode,
                onChange: (e) => changeField(e),
                title: "Zip Code",
                disabled: edit.disabled,
                required: edit.required,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
              component="button"
              size="large"
              variant="contained"
              color="secondary"
              onClick={(e) => changeButton(e)}
            >
              {edit.isEdit === true ? "CLICK TO SAVE UPDATE" : "CLICK TO EDIT"}
            </Button>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};
