import { loadStripe } from "@stripe/stripe-js";

let stripe;

const getStripe = async () => {
  if (!stripe) {
    // stripe = await loadStripe(
    //   `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    // );
    stripe = await loadStripe(
      "pk_test_51LglKoSBqPBXPkknJiNUSwdqJ9iJxzONp8WjE60LAoaNmxThIvE8NvBum9YrwTcbWDplruEBT8Az3uHMNIhxdo7C00nj6u0RaU"
    );
    console.log(
      "PUBLISHABLE KEY",
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );
  }
  return stripe;
};
export default getStripe;
