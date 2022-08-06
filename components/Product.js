import React from "react";
import styled from "styled-components";
function Product({ product }) {
  const { title, price, image } = product.attributes;
  return (
    <ProductStyle>
      <div>
        <img src={image.data.attributes.formats.small.url} alt="" />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
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
