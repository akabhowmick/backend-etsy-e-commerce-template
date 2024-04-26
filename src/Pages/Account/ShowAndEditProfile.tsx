import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomInput } from "./CustomInput";
import { useUserContext } from "../../providers/UserProvider";

export const ShowAndEditProfile = () => {
  const { user } = useUserContext();
  const [value, setValue] = useState("one");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // FORM STATES
  const [displayUser, setDisplayUser] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUser({ ...user, [event.target.name]: event.target.value });
  };

  //BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  // EDIT -> UPDATE -> on click (?)
  const changeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowPassword(false);
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    console.log("user: ", user);
  };

  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    setShowPassword(false);
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      {/* TABS */}
      <br></br>
      <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
        <Tab value="one" label="Account" />
        <Tab value="two" label="Address" />
        <Tab value="three" label="Order History" />
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
              {/* ROW 1: FIRST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  inputProps={{
                    id: "firstName",
                    name: "firstName",
                    value: displayUser.firstName,
                    onChange: (e) => changeField(e),
                    title: "First Name",
                    disabled: edit.disabled,
                    required: edit.required,
                  }}
                ></CustomInput>
              </Grid>

              {/* ROW 1: LAST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  inputProps={{
                    id: "lastName",
                    name: "lastName",
                    value: displayUser.lastName,
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
                    value: displayUser.phone,
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
                    value: displayUser.email,
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
                    value: displayUser.phone,
                    onChange: (e) => changeField(e),
                    title: "Password",
                    disabled: edit.disabled,
                    required: edit.required,
                    type: showPassword ? "text" : "password",
                  }}
                  passwordProps={{ handlePassword, showPassword, disabled: edit.disabled }}
                />
              </Grid>

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
