
import React, { useEffect, useState, useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { postFetch } from '../helpers/fetchs';
import { useParams } from "react-router-dom";
import CartContext from "../components/context/CartContext";
import '../style/body.css';
import '../style/product.css';

function Product() {
    const { id } = useParams();
    const [product,setProduct] = useState();
    const {cartContext, setCartContext} = useContext(CartContext);
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
            setCartContext(JSON.stringify(cart))
            console.log()
        }else{
            localStorage.setItem("cart",JSON.stringify([{product,quantity:select.options[select.selectedIndex].text}]));
        }
    };

    const saveFavorite = async () => {
        setFavorite(true);
        var data = {fk_id_product:id};
        await postFetch("/save-favorite-product", data)
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
        })

    }

    const deleteFavorite = () => {
        setFavorite(false);
    }

  return (
    <div className="page-content page-content-product">
        {product ?
            <div className="product-container">
                <div className="product-page-img">
                    <img className="product-page-img" src={`http://localhost:5000/uploads/${product.fk_id_space}/${product.image}`}></img>
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