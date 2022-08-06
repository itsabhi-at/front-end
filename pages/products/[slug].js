import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";

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
  console.log(data);
  return (
    <div>
      <img src="" alt="" />
      <div>
        <h3>Title</h3>
        <p>description</p>
        <div>
          <span>Quatity</span>
          <button>plus</button>
          <p>0</p>
          <button>Minus</button>
        </div>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;
