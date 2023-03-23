import React from "react";
import {useParams} from "react-router-dom";
function Product({name, symbol}) {
    const params = useParams()
  return (
    <div><h1>{name}</h1>
    <h1>{symbol}</h1>
    </div>
  );
}

export default Product;
