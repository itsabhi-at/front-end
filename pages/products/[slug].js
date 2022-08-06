import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import styled from "styled-components";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
function ProductDetails() {
  const { query } = useRouter();

  // fetching data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading..</p>;
  if (error) return <p>error it is</p>;
  const { title, description, image } = data.products.data[0].attributes;
  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quatity</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy>Add to Cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}

export default ProductDetails;

const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`;
const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
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
const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
