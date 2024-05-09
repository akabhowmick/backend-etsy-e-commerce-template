import { Button, Container, Grid, Typography, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../providers/UserProvider";

export const Shipping = ({ handleNext }: { handleNext: () => void }) => {
  const { setOrderUser, user } = useUserContext();
  const [formValues, setFormValues] = useState({ ...user });

  useEffect(() => {
    setFormValues({ ...user });
  }, [user]);

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  //! change this for the regular one too(?)
  const onAddressChange = (e: { target: { name: string; value: string } }) => {
    setFormValues({
      ...formValues,
      userAddress: { ...formValues.userAddress, [e.target.name]: e.target.value },
    });
  };

  const handleNextClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOrderUser(formValues);
    handleNext();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Box component="form" onSubmit={(e) => handleNextClick(e)} className="shipping-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>
                  Your details (change if needed)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={onChange}
                  value={formValues.firstName}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  onChange={onChange}
                  value={formValues.lastName}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  onChange={onChange}
                  value={formValues.email}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone"
                  onChange={onChange}
                  value={formValues.phone}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <hr />
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="addressLine1"
                  label="Address Line 1"
                  onChange={onAddressChange}
                  value={formValues.userAddress?.addressLine1}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="city"
                  label="City"
                  onChange={onAddressChange}
                  value={formValues.userAddress?.city}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="state"
                  label="State"
                  onChange={onAddressChange}
                  value={formValues.userAddress?.state}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="country"
                  label="Country"
                  onChange={onAddressChange}
                  value={formValues.userAddress?.country}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="zipCode"
                  label="Zip Code"
                  onChange={onAddressChange}
                  value={formValues.userAddress?.zipCode}
                  fullWidth
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};
