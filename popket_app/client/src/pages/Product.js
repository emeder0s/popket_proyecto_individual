
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import '../style/body.css';
import '../style/product.css';

function Product() {
    const { id } = useParams();
    const [product,setProduct] = useState();
    const [favorite,setFavorite] = useState();
    const options = [1,2,3,4,5,6,7,8,9,10];

    
    const getProduct = ()=> {
        fetch(`/product/${id}`)
        .then((res) => res.json(res))
        .then(res=>{
            setProduct(res);
        });
    }

    useEffect(()=>{
        getProduct();
    },[]);

    const addProduct = () => {
        var select = document.getElementById("quantity");
        var cart = localStorage.getItem("cart");
        if (cart) {
            cart = JSON.parse(cart)
            cart.push({product,quantity:select.options[select.selectedIndex].text});
            localStorage.setItem("cart",JSON.stringify(cart));
        }else{
            localStorage.setItem("cart",JSON.stringify([{product,quantity:select.options[select.selectedIndex].text}]));
        }
    };

    const saveFavorite = () => {
        setFavorite(true);
    }

    const deleteFavorite = () => {
        setFavorite(false);
    }

  return (
    <div className="page-content page-content-product">
        {product ?
            <div className="product-container">
                <div className="product-img">
                    <img className="product-img" src={`http://localhost:5000/uploads/${product.fk_id_space}/${product.image}`}></img>
                </div>
                <div className="product-details">
                    <div className="product-name">{product.product_name} {favorite ? <a className="make-favorite" onClick={deleteFavorite} title="Elimina de Favoritos"><AiFillHeart/></a>:<a className="make-favorite" onClick={saveFavorite} title="Añade a Favoritos"><AiOutlineHeart/></a>}</div>
                    <div className="product-price">{product.price}€</div>
                    <div className="quantity">
                        <select id="quantity">
                            {options.map((option,i) =>{
                                return (<option key={i}>{option}</option>)
                            })}
                        </select>
                        </div>
                    <div className="add-to-cart"><button onClick={addProduct}>Añadir al carrito</button></div>
                    <div className="product-description">{product.description}</div>
                </div>
            </div>
        :""}

    </div>   
  );
}

export default Product;