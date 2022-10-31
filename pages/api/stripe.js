import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "IN", "CA"],
        },
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "inr",

              product_data: {
                name: item.attributes.title,
                images: [
                  item.attributes.image.data.attributes.formats.small.url,
                ],
              },
              // adjustable_quantity: {
              //   enabled: true,
              //   quantity: 1,
              // },
              unit_amount: item.attributes.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        //success or fail page
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
