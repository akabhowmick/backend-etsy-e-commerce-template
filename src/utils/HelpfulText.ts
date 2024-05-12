import { UserInfo } from "../Types/interfaces";

export const heroText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";

const orderPlacement = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
];

const orderProcessing = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
];

const photoGuidelines = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
];

const howToUploadPhoto = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
];

const returnPolicy = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
];

export const fullDetailedDetails = [
  orderPlacement,
  orderProcessing,
  photoGuidelines,
  howToUploadPhoto,
  returnPolicy,
];

export const initialAddress = {
  addressLine1: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

export const initialUserValues: UserInfo = {
  id: 0,
  user_id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  userAddress: initialAddress,
  orderHistory: [],
};

export const reviewTexts = [
  {
    name: "Name 1",
    date: "Date 1",
    review: "Lorem ipsum dolor sit amet, consectetur adip",
    id: 1,
  },
  {
    name: "Name 2",
    date: "Date 2",
    review: "Lorem ipsum dolor sit amet, consectetur adip",
    id: 2,
  },
  {
    name: "Name 3",
    date: "Date 3",
    review: "Lorem ipsum dolor sit amet, consectetur adip",
    id: 3,
  },
  {
    name: "Name 4",
    date: "Date 4",
    review: "Lorem ipsum dolor sit amet, consectetur adip",
    id: 4,
  },
];

export const companyName = "Your Company Name";
export const companyTagline = "Lorem ipsum dolor consectetur!";
