import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../style/space.css'

function Space() {
    const { id } = useParams();
    const [space,setSpace] = useState();
    const [products,setProducts] = useState();

    const getSpace = ()=> {
        fetch(`/space/${id}`)
        .then((res) => res.json(res))
        .then(res=>{
            setSpace(res);
        });
    }

    const getProducts = ()=> {
        fetch(`/get-products-by-space/${id}`)
        .then((res) => res.json(res))
        .then(res=>{
            setProducts(res);
        });
    }

    useEffect(()=>{
        getSpace();
        getProducts();
    },[])

  return (
    <div className="page-content page-content-space">
        {space ? 
            <div className="photo-title">
                <h2 className="space-title">{space.name_space}</h2>
                <div className="space-description"><p>{space.description}</p></div>
            </div>
        : ""}
        {products ? 
            <div className="products-container">
                {products.map((product, i) => {
                    return (
                        <Link to={`/producto/${product.id}`} className="nav-link" key={i}>
                        <div className="product-container" key={`product-container-${i}`}>
                            <div className="product-img" key={`product-img-${i}`}>
                                <img className="product-img" src={`http://localhost:5000/uploads/${id}/${product.image}`} key={`img-${i}`}></img>
                                </div>
                            <div className="product-details" key={`product-details-${i}`}>
                                <div key={`product-name-${i}`}>{product.product_name}</div>
                                <div key={`product-price-${i}`}>{product.price}€</div>
                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        :""}
    </div>   
  );
}

export default Space;