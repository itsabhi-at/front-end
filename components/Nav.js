import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import styled from "styled-components";
function Nav() {
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
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
      font-size: 1rem;
    }
  }
`;
