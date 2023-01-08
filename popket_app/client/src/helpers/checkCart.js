export const checkCart =  () => {
    const cart = localStorage.getItem("cart");
    if (cart == null || cart.length < 0){
        localStorage.setItem("cart",JSON.stringify([]));
    }               
}