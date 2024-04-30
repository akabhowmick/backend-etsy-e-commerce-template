import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomInput } from "./CustomInput";
import { useUserContext } from "../../providers/UserProvider";
import { User } from "../../Types/interfaces";

export const ShowAndEditProfile = () => {
  const { user, setUser } = useUserContext();
  const [displayUser, setDisplayUser] = useState<User>({ ...user });
  const [showPassword, setShowPassword] = useState(false);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUser({ ...displayUser, [event.target.name]: event.target.value });
  };

  const handlePassword = () => {
    setShowPassword(false);
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: false,
  });

  // ! send this to edit the user if the things make sense => meaning all of them?
  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    setUser(displayUser);
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      {/* MAIN CONTENT CONTAINER */}
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
            <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Profile</Typography>
          </Grid>
          <Grid container direction={{ xs: "column", md: "row" }} columnSpacing={5} rowSpacing={3}>
            {/* ROW 1: FIRST NAME */}
            <Grid component="form" item xs={6}>
              <CustomInput
                inputProps={{
                  id: "firstName",
                  name: "firstName",
                  value: displayUser.firstName || "",
                  onChange: (e) => changeField(e),
                  title: "First Name",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              />
            </Grid>

            {/* ROW 1: LAST NAME */}
            <Grid component="form" item xs={6}>
              <CustomInput
                inputProps={{
                  id: "lastName",
                  name: "lastName",
                  value: displayUser.lastName || "",
                  onChange: (e) => changeField(e),
                  title: "Last Name",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>

            {/* ROW 3: PHONE */}
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "phone",
                  name: "phone",
                  value: displayUser.phone || "",
                  onChange: (e) => changeField(e),
                  title: "Phone Number",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>

            {/* ROW 3: EMAIL */}
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "email",
                  name: "email",
                  value: displayUser.email || "",
                  onChange: (e) => changeField(e),
                  title: "Email Address",
                  disabled: edit.disabled,
                  required: edit.required,
                }}
              ></CustomInput>
            </Grid>

            {/* ROW 4: PASSWORD */}
            <Grid item xs={6}>
              <CustomInput
                inputProps={{
                  id: "pass",
                  name: "pass",
                  // ! change this to update password
                  value: displayUser.phone || "",
                  onChange: (e) => changeField(e),
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
