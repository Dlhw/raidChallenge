import './Item.css'
import NumberInput from '../../components/MUI/NumberInput'
import {useState} from 'react'
import { postCart,updateCart } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const Item = (props) => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleAddToCart = () =>{

        if(localStorage.getItem("auth-token")===null){
            navigate("/login");
            return
        }
        if (value){
            props.setCart(prevCart=>{
                let newCart ={
                    userid:jwtDecode(localStorage.getItem("auth-token")).user.id,
                    qty_price:{
                        ...prevCart.qty_price
                    }
                };
                // if props.name exists as key in prevCart, do summation
                if(prevCart.qty_price && prevCart.qty_price[props.name]){
                    newCart.qty_price[props.name]={
                        qty: prevCart.qty_price[props.name].qty+value,
                        price:props.price
                    }
                }else{
                    // set new key-value pair in cart
                    newCart.qty_price[props.name]={
                        qty:value,
                        price:props.price
                    };
                };
                // if cart is empty, create cart and push to db
                if (Object.keys(props.cart.qty_price).length === 0){
                    postCart(newCart)
                }
                else // cart not empty hence update db
                {
                    updateCart(newCart,newCart.userid);
                }
                return newCart;
            })
            toast.success("Added to Cart!")
        }
        else{
            toast.error("Please Input Quantity")
        }
    }
    
    return(
        <div className="item">
            <img src={require(`../../assets/${props.name}.jpg`)} alt={props.name}/>
            <div className='top-row'>
                <p>{props.name}</p>
                <NumberInput  
                max={props.stock} 
                value={value}
                setValue= {setValue}
                />
            </div>
            <div className='bot-row'>
                <div className='price-stock'>
                    <div className='item-price'>
                        ${props.price}
                    </div>
                    <div className='item-stock'>
                        Stock:{props.stock}
                    </div>
                </div>
                <button className="right-aligned-button" onClick={() => handleAddToCart()}>Add to cart</button>
            </div>
        </div>
    )
}

export default Item