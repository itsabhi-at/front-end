const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "styled-components";
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return {
      props: {
        orders: paymentIntents.data,
      },
    };
  },
});
function profile({ user, orders }) {
  return (
    user && (
      <ProfileWrapper>
        <div className="d-flex justify-between">
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <Link href={"/api/auth/logout"}>
            <LogoutButton>Logout</LogoutButton>
          </Link>
        </div>

        <div>
          {orders.map((order) => {
            return (
              <Order>
                <h2>Order Number: {order.id}</h2>
                <h2>Amount: {order.amount / 100}</h2>
                <h2>Receipt Email: {order.receipt_email}</h2>
              </Order>
            );
          })}
        </div>
      </ProfileWrapper>
    )
  );
}

export default profile;
const ProfileWrapper = styled.div`
  .d-flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
`;

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
`;
const LogoutButton = styled.button`
  color: white;
  background: var(--primary);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 12px;
`;
