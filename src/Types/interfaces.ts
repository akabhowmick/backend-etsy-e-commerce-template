import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Session, WeakPassword } from "@supabase/supabase-js";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  user_id?: string;
  orderHistory?: string[];
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
