import { MouseEvent, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "./ButtonWrapper.js";
import { useCartContext } from "../../../providers/CartProvider.js";
import { Button } from "@mui/material";
import { paypalClientId } from "../../../utils/ApiKeys.js";
import "../Checkout/Checkout.css";
import Swal from "sweetalert2";
import { Order } from "../../../Types/interfaces.js";
import { useUserContext } from "../../../providers/UserProvider.js";

export const Payment = ({ handleNext }: { handleNext: () => void }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { finalTotal, cartItems } = useCartContext();
  const { setUser, user, order } = useUserContext();
  const currency = "USD";

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (paymentSuccess) {
      const newOrder: Order = {
        shipTo: user.userAddress,
        items: cartItems,
        cost: finalTotal,
        orderId: order,
        date: new Date(),
      };
      setUser({
        ...user,
        orderHistory: [...user.orderHistory, newOrder],
      });
      handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Payment failed!",
      });
    }
  };

  return (
    <div>
      <div className="payment-info">
        <h2 className="page-title">Payment</h2>
        <div className="paypal-buttons">
          <h3>Complete the payment!</h3>
          <PayPalScriptProvider
            options={{
              clientId: paypalClientId,
              components: "buttons",
              currency: "USD",
            }}
          >
            <ButtonWrapper
              amount={finalTotal}
              currency={currency}
              showSpinner={true}
              setPaymentSuccess={() => setPaymentSuccess(true)}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleNextClick(e)}
      >
        Next
      </Button>
    </div>
  );
};
