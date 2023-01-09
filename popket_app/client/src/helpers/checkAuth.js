import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const checkAuth =  () => {
    return localStorage.getItem("user") && cookies.get("session") ? true : false;
}