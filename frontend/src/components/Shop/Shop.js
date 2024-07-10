import {useState, useEffect,useContext} from 'react'
import { CartContext ,getCart} from '../../context/cartContext'
import Item from '../Item/Item'
import './Shop.css'
import { jwtDecode } from 'jwt-decode'

const Shop = () => {
    const [stock, setStock] = useState(null);
    const {cart,setCart} = useContext(CartContext);
    useEffect(()=>{
        const fetchFruits = async ()=>{
            const response = await fetch('/api/fruitstore')
            const json = await response.json()

            if (response.ok){
                setStock(json[0])
            }
            const token = localStorage.getItem("auth-token");
            if (token) {
                const decoded = jwtDecode(token);
                const tempCart = await getCart(decoded.user.id);
                if (Object.keys(tempCart).length !==0){
                    setCart(tempCart);
                }
            }
        }
        fetchFruits();
        
    }, [])
    useEffect(()=>{
        console.log(cart);
        console.log(Object.keys(cart).length);
    },[cart]);
    return (
        <div className='shop'>
            <h1>Available Items</h1>
            <hr/>
            <div className="shop-items">
                {stock && Object.entries(stock.stock).map(([name, details], i) => (
                    <Item 
                        key={i}
                        name={name}
                        price={details.price}
                        stock={details.stock}
                        setCart={setCart}
                        cart = {cart}
                    />
                ))}
            </div>
        </div>
    )
}

export default Shop;