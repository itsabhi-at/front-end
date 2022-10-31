import Link from "next/link";
import styled from "styled-components";
const { motion } = require("framer-motion");
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

function success({ order }) {
  console.log("orders", order);
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h2>Payment Successful !!</h2>
        <p>
          Thank you for purchasing from Styled. We have sent a payment receipt
          to your email id <span> {order.customer_details.email} </span>
        </p>
        <InfoWrapper>
          <div>
            <h3>Address Details</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => {
                return (
                  <p className="text-capitalize" key={key}>
                    {key}: {val}
                  </p>
                );
              }
            )}
          </div>
          <div>
            <h3>Products</h3>
            <div>
              {Object.entries(order.line_items.data).map(([key, val]) => {
                return (
                  <div key={key}>
                    <p>Product Name : {val.description}</p>
                    <p>Quantity : {val.quantity}</p>
                    <p>Amount Paid : {val.amount_total / 100}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </InfoWrapper>
        <Link href={"/"}>
          <button>Continue Shopping</button>
        </Link>
      </Card>
    </Wrapper>
  );
}

export default success;

const Wrapper = styled.div`
  margin: 5rem 15rem;
`;
const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 3rem;
  border-radius: 8px;
  h2 {
    margin-bottom: 1rem;
  }
  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 12px;
  }
  span {
    font-weight: bold;
    color: var(--primary);
  }
`;
const InfoWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
  .text-capitalize {
    text-transform: capitalize;
  }
  h3 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.2rem;
  }
`;
