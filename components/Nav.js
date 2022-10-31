import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import styled from "styled-components";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import User from "../components/User";
import { useUser } from "@auth0/nextjs-auth0";

const { AnimatePresence, motion } = require("framer-motion");

function Nav() {
  const { showCart, setShowCart, qty, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();

  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}

export default Nav;

const NavStyles = styled.div`
  min-height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-family: 1.2rem;
  }
`;
const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  cursor: pointer;
  div {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 0.75rem;
    }
    svg {
      font-size: 2rem;
    }
    span {
      background: #ff2626;
      color: white;
      width: 1.3rem;
      height: 1.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 0.75rem;
      position: absolute;
      top: -10px;
      right: -10px;
      pointer-events: none;
    }
  }
`;
