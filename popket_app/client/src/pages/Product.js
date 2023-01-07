import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../style/space.css'

function Product() {
    const { id } = useParams();
    const [product,setProduct] = useState();
    
    const getProduct = ()=> {
        fetch(`/product/${id}`)
        .then((res) => res.json(res))
        .then(res=>{
            setProduct(res);
        });
    }

    useEffect(()=>{
        getProduct();
    },[])

  return (
    <div class Name="page-content page-content-space">

    </div>   
  );
}

export default Product;