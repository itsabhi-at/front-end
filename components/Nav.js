import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import styled from "styled-components";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";

function Nav() {
  const { showCart, setShowCart, qty, totalQuantities } = useStateContext();
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <span>{totalQuantities}</span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      {showCart && <Cart />}
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
