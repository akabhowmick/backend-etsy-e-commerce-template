import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useUserContext } from "../../providers/UserProvider";
import { CustomInput } from "./CustomInput";
import { initialAddress } from "../../utils/HelpfulText";
import { Logout } from "../../Components/AccountBtns/Logout";
import { EditAccount } from "../../Components/AccountBtns/EditAccount";

export const ShowAndEditAddress = () => {
  const { userInfo, setUserInfo, updateUserInfoThroughAccount } = useUserContext();
  const [originalAddressValues, setOriginalAddressValues] = useState(initialAddress);

  useEffect(() => {
    setOriginalAddressValues({ ...userInfo.userAddress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      userAddress: { ...userInfo.userAddress, [event.target.name]: event.target.value },
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
      JSON.stringify(originalAddressValues) !== JSON.stringify(userInfo.userAddress)
    ) {
      updateUserInfoThroughAccount(!edit.isEdit);
    }
  };

  return (
    <Card className="account-spacing" variant="outlined" sx={{ height: "100%", width: "100%" }}>
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
          <Grid container direction={{ xs: "column", md: "row" }} columnSpacing={5} rowSpacing={3}>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "addressLine1",
                  name: "addressLine1",
                  value: userInfo.userAddress?.addressLine1 ?? "",
                  onChange: (e) => changeField(e),
                  title: "Address Line 1",
                  disabled: edit.disabled,
                  required: edit.required,
                  autoComplete: "address-level1",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "city",
                  name: "city",
                  value: userInfo.userAddress?.city ?? "",
                  onChange: (e) => changeField(e),
                  title: "City",
                  disabled: edit.disabled,
                  required: edit.required,
                  autoComplete: "off",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "state",
                  name: "state",
                  value: userInfo.userAddress?.state ?? "",
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
                  value: userInfo.userAddress?.country ?? "",
                  onChange: (e) => changeField(e),
                  title: "Country",
                  disabled: edit.disabled,
                  required: edit.required,
                  autoComplete: "country",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "zipCode",
                  name: "zipCode",
                  value: userInfo.userAddress?.zipCode ?? "",
                  onChange: (e) => changeField(e),
                  title: "Zip Code",
                  disabled: edit.disabled,
                  required: edit.required,
                  autoComplete: "postal-code",
                }}
              />
            </Grid>
            <Grid
              id="account-buttons-container"
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <EditAccount isEdit={edit.isEdit} onClick={(e) => changeButton(e)} />
              <Logout />
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};
