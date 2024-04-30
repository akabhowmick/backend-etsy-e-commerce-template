import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useCartContext } from "../../../providers/CartProvider";
import { useUserContext } from "../../../providers/UserProvider";
import { Product } from "../../../Types/interfaces";
import { orderReviewFormId, uploadImagePage } from "../../../utils/ApiKeys";
import Button from "@mui/material/Button";
import { addressToString } from "../../../utils/HelperFunctions";

export default function Review() {
  const { cartItems, finalTotal } = useCartContext();
  const { user, order } = useUserContext();

  const infoForSeller = [
    { name: "_template_id", value: "table" },
    { name: "Name", value: user.firstName + " " + user.lastName },
    { name: "_subject", value: "Complete Order for Your Business Name!" },
    {
      name: "Email-Address",
      value: user.email,
    },
    {
      name: "Phone-Number",
      value: user.phone,
    },
    { name: "Order-Number", value: order },
    {
      name: "Shipping-Address",
      value: addressToString(user.userAddress),
    },
    {
      name: "Total-Cost",
      value: "$" + finalTotal.toFixed(2),
    },
  ];

  const FormSubmitIoInputs = infoForSeller.map(({ name, value }) => {
    return <input type="hidden" key={name} name={name} value={value} />;
  });

  const productToString = (product: Product) => {
    let result = `Product Name: ${product.name}\n`;
    result += `Quantity: ${product.quantity}\n`;
    if (product.requiredCustomizations) {
      result += "Required Customizations:\n";
      product.requiredCustomizations.forEach((customization) => {
        result += `${customization.key}: ${customization.value}\n`;
      });
    }
    return result;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems?.map((cartItem) => (
          <ListItem key={cartItem.name} sx={{ py: 1, px: 0 }}>
            <img
              src={cartItem.images[0]}
              style={{
                maxWidth: "60px",
                margin: "0.5rem",
                borderRadius: "10px",
              }}
            />
            <ListItemText primary={cartItem.name} secondary={cartItem.desc} />
            <Typography variant="body2">${cartItem.price.toFixed(2)}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total (including shipping and taxes)" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${finalTotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{user.firstName + " " + user.lastName}</Typography>
          <Typography gutterBottom>{addressToString(user.userAddress)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" id="order-number">
            Order Number: #{order}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Please save this number for future reference and for us to use when sending us your
            customizations.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <form action={orderReviewFormId}>
          <input type="hidden" name="_redirect" value={uploadImagePage} />
          {FormSubmitIoInputs}
          {cartItems.map((product) => {
            return (
              <input
                key={product.id}
                type="hidden"
                name="Product-Ordered"
                value={productToString(product)}
              />
            );
          })}
          <Button fullWidth type="submit" variant="contained" color="primary">
            <Typography>Upload Images and Personalizations!</Typography>
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
}
