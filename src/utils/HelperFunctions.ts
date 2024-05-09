import { Address, Order, Product } from "../Types/interfaces";
import { initialAddress } from "./HelpfulText";

export const productToString = (product: Product) => {
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

//! need customizations?
export const stringToProduct = (productString: string): Product => {
  const lines = productString.split("\n");
  const product: Product = {
    name: "",
    price: 0,
    bulkOptions: [],
    options: [],
    requiredCustomizations: [],
    shortDetails: [],
    details: [],
    images: [],
    desc: "",
    quantity: 0,
    id: 0,
    type: "",
    learnMoreLink: "",
  };
  lines.forEach((line) => {
    const [key, value] = line.split(":");
    // let customizations: string[] = [];
    switch (key.trim()) {
      case "Product Name":
        product.name = value.trim();
        break;
      case "Quantity":
        product.quantity = parseInt(value.trim(), 10);
        break;
      // case "Required Customizations":
      //   customizations = value.trim().split("/n");
      //   customizations.forEach((customization) => {
      //     const [customizationKey, customizationValue] = customization.split(":");
      //     product.requiredCustomizations?.push({
      //       key: customizationKey.trim(),
      //       value: customizationValue.trim(),
      //     });
      //   });
      //   break;
      default:
        break;
    }
  });

  return product;
};

export const addressToString = (address: Address) => {
  let result = `Address Line 1 - ${address.addressLine1}\n`;
  result += `City - ${address.city}\n`;
  result += `State - ${address.state}\n`;
  result += `Country - ${address.country}\n`;
  result += `Zip Code - ${address.zipCode}\n`;
  return result;
};

export const stringToAddress = (addressString: string): Address => {
  const lines = addressString.split("\n");
  const address: Address = {
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  };
  lines.forEach((line) => {
    const [key, value] = line.split(" - ");
    switch (key.trim()) {
      case "Address Line 1":
        address.addressLine1 = value.trim();
        break;
      case "City":
        address.city = value.trim();
        break;
      case "State":
        address.state = value.trim();
        break;
      case "Country":
        address.country = value.trim();
        break;
      case "Zip Code":
        address.zipCode = value.trim();
        break;
      default:
        break;
    }
  });

  return address;
};

const orderToString = (order: Order) => {
  let result = `Order Id: ${order.orderId};`;
  result += `Order Date: ${order.date};`;
  result += `Shipping Address: ${addressToString(order.shipTo)};`;
  result += `Total Cost: ${order.cost};`;
  for (const product of order.items) {
    result += productToString(product);
  }
  return result;
};

export const stringToOrder = (orderString: string): Order => {
  const orderParts = orderString.split(";");
  const order: Order = {
    orderId: "",
    date: new Date(),
    shipTo: { ...initialAddress },
    items: [],
    cost: 0,
  };

  for (const part of orderParts) {
    const [key, value] = part.split(":");
    switch (key.trim()) {
      case "Order Id":
        order.orderId = value.trim();
        break;
      case "Order Date":
        order.date = new Date(value.trim());
        break;
      case "Shipping Address":
        order.shipTo = stringToAddress(value.trim());
        break;
      case "Total Cost":
        order.cost = parseFloat(value.trim());
        break;
      default:
        order.items.push(stringToProduct(part.trim()));
        break;
    }
  }
  return order;
};

export const ordersToString = (orders: Order[]) => {
  const result = [];
  for (const order of orders) {
    result.push(orderToString(order));
  }
  return result;
};
