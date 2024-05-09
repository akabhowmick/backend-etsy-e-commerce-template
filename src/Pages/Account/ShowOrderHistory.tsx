import Typography from "@mui/material/Typography";
import { useUserContext } from "../../providers/UserProvider";
import "./Account.css";

export const ShowOrderHistory = () => {
  const { user } = useUserContext();

  const noOrders = <div>No Orders Yet!</div>;

  const userOrders = user.orderHistory?.map((order) => {
    return (
      <tr className="order" key={order.orderId}>
        <td className="order-number" data-title="Order">
          <a href="*">{order.orderId}</a>
        </td>
        <td className="order-date" data-title="Date">
          <time dateTime="2014-06-12" title="1402562157">
            {order.date.toString()}
          </time>
        </td>
        <td className="order-total" data-title="Total">
          <span className="amount">{order.cost}</span>
          {order.items.length} items
        </td>
      </tr>
    );
  });

  return (
    <div className="order-history">
      <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Order History</Typography>
      {user.orderHistory === null || user.orderHistory.length === 0 ? (
        noOrders
      ) : (
        <table className="shop_table my_account_orders">
          <thead>
            <tr>
              <th className="order-number">Order</th>
              <th className="order-date">Date</th>
              <th className="order-status">Status</th>
              <th className="order-total">Total</th>
              <th className="order-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{userOrders}</tbody>
        </table>
      )}
    </div>
  );
};
