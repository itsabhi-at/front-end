import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import styled from "styled-components";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";

function ProductDetails() {
  // use State
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();

  // fetch slug
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
  console.log("this is product", data.products.data[0]);
  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quatity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0], qty);
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}

export default ProductDetails;

const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  img {
    width: 40%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 1rem;
    img {
      width: 100%;
    }
  }
`;
const ProductInfo = styled.div`
  width: 40%;
  h3 {
    margin: 0.5rem 0rem;
  }
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
