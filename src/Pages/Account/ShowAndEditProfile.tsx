import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomInput } from "./CustomInput";
import { useUserContext } from "../../providers/UserProvider";
import { initialUserValues } from "../../utils/HelpfulText";
import { useAuthContext } from "../../providers/AuthProvider";

export const ShowAndEditProfile = () => {
  const { editUserLogin } = useAuthContext();
  const { user, setUser, updateUserInfoThroughAccount } = useUserContext();
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [originalProfileValues, setOriginalProfileValues] = useState(initialUserValues);

  useEffect(() => {
    setOriginalProfileValues({ ...user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
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
      JSON.stringify(originalProfileValues) !== JSON.stringify(user.userAddress)
    ) {
      updateUserInfoThroughAccount(!edit.isEdit);
    }
    if (!edit.isEdit && (passwordInput || originalProfileValues.email !== user.email)) {
      editUserLogin(user.email, passwordInput);
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
                  autoComplete: "given-name",
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
                  autoComplete: "family-name",
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
                  autoComplete: "off",
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
                  autoComplete: "off",
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "password",
                  name: "password",
                  value: passwordInput ?? "",
                  onChange: (e) => setPasswordInput(e.target.value),
                  title: "Password",
                  disabled: edit.disabled,
                  required: edit.required,
                  type: showPassword ? "text" : "password",
                  autoComplete: "new-password",
                }}
                isPasswordInput={true}
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
              color="primary"
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
