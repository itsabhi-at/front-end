import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useStateContext } from "../lib/context";

function Product({ product }) {
  const { setQty } = useStateContext();
  const { title, price, image, slug } = product.attributes;

  const changeQty = () => {
    setQty(1);
  };
  return (
    <ProductStyle>
      <Link onClick={changeQty()} href={`/products/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt="" />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>₹{price}</h3>
    </ProductStyle>
  );
}

export default Product;

const ProductStyle = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  img {
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
  h2 {
    padding: 0.5rem 0rem;
  }
`;
