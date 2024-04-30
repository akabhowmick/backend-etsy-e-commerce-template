import { Address, Product } from "../Types/interfaces";
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
}

export const addressToString = (address: Address) => {
  let result = `Address Line 1: ${address.addressLine1}\n`;
  result += `City: ${address.city}\n`;
  result += `State: ${address.state}\n`;
  result += `Country: ${address.country}\n`;
  result += `Zip Code: ${address.zipCode}\n`;
  return result; 
}

