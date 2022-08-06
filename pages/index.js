import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";
export default function Home() {
  //fetch from strapi
  const [results] = useQuery({
    query: PRODUCT_QUERY,
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading..</p>;
  if (error) return <p>error it is</p>;

  const products = data.products.data;
  console.log(products);
  return (
    <div>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello Next</h1>
        <Gallery>
          {products.map((product, index) => (
            <Product product={product} key={product.attributes.slug} />
          ))}
        </Gallery>
      </main>
    </div>
  );
}
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;
