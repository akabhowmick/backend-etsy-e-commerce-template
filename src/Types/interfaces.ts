import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Session, WeakPassword } from "@supabase/supabase-js";

export interface Address {
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Order { 
  shipTo: Address; 
  items: Product[];
  cost: number; 
  orderId : string;
  date: Date; 
}

export interface User {
  user_id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  userAddress?: Address;
  orderHistory?: Order[];
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserDataFromSupabase {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword | undefined;
}

export interface Product {
  name: string;
  price: number;
  bulkOptions?: ProductOptions[];
  options?: ProductOptions[];
  requiredCustomizations?: KeyValueStringPairs[];
  shortDetails: string[];
  details: string[];
  images: string[];
  desc: string;
  quantity: number;
  id: number;
  type: string;
  learnMoreLink: string;
}

export interface faIcon {
  link: string;
  icon: IconProp;
}

interface ProductOptions {
  quantity: number | string;
  price: number;
}

export interface KeyValueStringPairs {
  key: string;
  value: string;
}

export interface ValidLogin {
  email: string;
  password: string;
  confirmPassword: string;
  match: boolean;
  charNumberValid: boolean;
  specialCharValid: boolean;
  uppercaseValid: boolean;
  numberValid: boolean;
}
