import CartItems from '../components/CartItems/CartItems'
import {useEffect} from "react";

const Cart = (props) => {
    useEffect(()=>{
        props.setMenu("Cart");
    },[]);
    return (
        <div>
            <CartItems/>
        </div>
    )

}

export default Cart