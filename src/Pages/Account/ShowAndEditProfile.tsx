import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomInput } from "./CustomInput";
import { useUserContext } from "../../providers/UserProvider";

export const ShowAndEditProfile = () => {
  const { user, setUser, updateUserInfoThroughAccount } = useUserContext();
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handlePassword = () => {
    setShowPassword(false);
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: false,
  });

  //! as long as not the same as earlier
  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    updateUserInfoThroughAccount(edit.isEdit);
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
        <FormControl fullWidth>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Profile</Typography>
          </Grid>
          <Grid container direction={{ xs: "column", md: "row" }} columnSpacing={5} rowSpacing={3}>
            <Grid component="form" item xs={6}>
              <CustomInput
                inputProps={{
                  id: "firstName",
                  name: "firstName",
                  value: user.firstName ?? "",
                  onChange: (e) => changeField(e),
                  title: "First Name",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              />
            </Grid>
            <Grid component="form" item xs={6}>
              <CustomInput
                inputProps={{
                  id: "lastName",
                  name: "lastName",
                  value: user.lastName || "",
                  onChange: (e) => changeField(e),
                  title: "Last Name",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "phone",
                  name: "phone",
                  value: user.phone || "",
                  onChange: (e) => changeField(e),
                  title: "Phone Number",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "email",
                  name: "email",
                  value: user.email ?? "",
                  onChange: (e) => changeField(e),
                  title: "Email Address",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "pass",
                  name: "pass",
                  value: passwordInput,
                  onChange: (e) => setPasswordInput(e.target.value),
                  title: "Password",
                  disabled: edit.disabled,
                  required: edit.required,
                  type: showPassword ? "text" : "password",
                }}
                passwordProps={{ handlePassword, showPassword, disabled: edit.disabled }}
              />
            </Grid>
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
