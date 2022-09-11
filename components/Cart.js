import { useStateContext } from "../lib/context";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
const { motion } = require("framer-motion");
export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();
  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        layout
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1>You have more shopping to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <motion.div layout>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  layout
                  key={item.attributes.slug}
                >
                  <img
                    src={
                      item.attributes.image.data.attributes.formats.thumbnail
                        .url
                    }
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.attributes.title}</h3>
                    <h3>₹{item.attributes.price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button>
                        <AiFillMinusCircle onClick={() => onRemove(item)} />
                      </button>
                      <p>{item.quantity}</p>

                      <button
                        onClick={() => {
                          onAdd(item, 1);
                        }}
                      >
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </motion.div>
        <motion.div layout>
          {cartItems.length >= 1 && (
            <Checkout layout>
              <h3>Subtotal:{totalPrice}</h3>
              <button>Purchase</button>
            </Checkout>
          )}
        </motion.div>
      </CartStyle>
    </CartWrapper>
  );
}
const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;
const CartStyle = styled(motion.div)`
  width: 40%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;
const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem 1rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;
const CardInfo = styled(motion.div)`
  width: 50%;
  div {
    display: flex;
    flex-direction: space-between;
  }
`;
const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    padding: 0rem 0.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;
const Checkout = styled(motion.div)`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
    border: none;
  }
`;
