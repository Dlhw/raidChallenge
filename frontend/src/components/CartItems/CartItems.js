import './CartItems.css'
import { CartContext, updateCart , deleteCart,postOrder, getCart, updateFruit} from '../../context/cartContext'
import {useState,useEffect, useContext,useRef} from 'react'
import NumberInput from '../../components/MUI/NumberInput'
import toast from 'react-hot-toast'
import ClearIcon from '@mui/icons-material/Clear';
import emptyCartLogo from '../../assets/empty_cart.png'
import {Link} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const {cart,setCart,setInCart} = useContext(CartContext);
    const [loading, setLoading] = useState(true); 
    const [cartTotal, setCartTotal] = useState(0);
    const stock = useRef(null);
    const navigate = useNavigate();
     // Initialize state to store quantities for each item
    const [quantities, setQuantities] = useState(() => {
        const initialQuantities = {};
        if (Object.keys(cart).length !== 0){
            Object.entries(cart.qty_price).forEach(([item, details]) => {
            initialQuantities[item] = details.qty;
        });}
        return initialQuantities;
    });

    const handleSubmitOrder=()=>{
        console.log(cartTotal);
        const order = {
            userid:cart.userid,
            qty_price:cart.qty_price,
            shipping_details:"",
            cartTotal:cartTotal,
        }
        Object.keys(cart.qty_price).forEach(item => {
            // Check if the item exists in stock.current
            if (stock.current.stock[item]) {
                // Calculate the remaining stock
                let remainingStock = stock.current.stock[item].stock - cart.qty_price[item].qty;
        
                // Update stock.current with remaining stock
                stock.current.stock[item].stock = remainingStock;
            }
        });
        updateFruit(stock.current,stock.current._id);  
        postOrder(order);
        deleteCart(cart.userid);
        setCart({
            userid:"",
            qty_price:{}
        });
        console.log(cart)
        toast.success("Order submitted:D")
    }    
    const removeFromCart=(item)=>{
        setCart(prevCart => {
            // Destructure the qty_price object from prevCart
            const { qty_price, ...rest } = prevCart;
        
            // Create a new object without the specified item key
            const newQtyPrice = Object.keys(qty_price).reduce((acc, key) => {
                if (key !== item) {
                    acc[key] = qty_price[key];
                }
                return acc;
            }, {});
        
            // Return the updated cart state
            const newCart = {
                ...rest, // Spread the rest of the properties from prevCart
                qty_price: newQtyPrice // Assign the updated qty_price object
            };
            if(Object.keys(newQtyPrice).length === 0){
                deleteCart(newCart.userid);
            }
            else //update cart
            {
                updateCart(newCart,newCart.userid);
            }
        
            return newCart;
        });
        toast.success(`Removed ${item} from cart!`)
    }

    const editQuantity = (item, newQty, price) => {
        
        setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item]: newQty,
        }));

        setCart(prevCart => {
            const newCart = {...prevCart,
                qty_price: {
                    ...(prevCart.qty_price ||{}),
                    [item]:{
                        "qty": newQty,
                        "price": price
                        }
                }
            }
            updateCart(newCart,newCart.userid);

            return newCart;
        });
    };
    
    const calculateTotal=()=>{
        let total = 0;
        Object.entries(cart.qty_price).forEach(([item, details]) => {
            total += (details.qty*details.price)
        });

        return total
    }

    useEffect(()=>{
        setCartTotal(calculateTotal());
        console.log(cartTotal);
    },[cart])

    useEffect(()=>{
        const fetchFruits = async ()=>{
            const response = await fetch('/api/fruitstore')
            const json = await response.json()

            if (response.ok){
                stock.current= json[0];
                setLoading(false);
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
        setInCart(true);
        return () => {
            setInCart(false);
        };
    },[]);

    // necessary to wait for stock.current to be updated in fetchFruits(), try removing to see error
    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <div className="cartItems">
            <div className='cart-cols'>
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            { Object.keys(cart.qty_price).length === 0?(
                <div className='emptyCart-logo'>
                <img src={emptyCartLogo} alt='empty Cart'/>
                <p>Your cart is empty....</p>
                <Link to='/'>
                <button>SHOP HERE</button>
                </Link>
                </div>
            ) :(
            <>
            {Object.entries(cart.qty_price).map(([item,details])=>(
                <div key={item} className='cartItems-row cart-cols'>
                    <img src={require(`../../assets/${item}.jpg`)} alt={item} className='cart-product-icon'/>
                    <p>{item}</p>
                    <p>${details.price}</p>
                    <div className='number-input-container'>
                    <NumberInput 
                        max={stock.current.stock[item].stock} 
                        value={quantities[item]}
                        setValue={(newQty) => editQuantity(item, newQty, details.price)}
                    />
                    Stock Left: {stock.current.stock[item].stock}
                    </div>
                    <p>${details.price*details.qty}</p>
                    <ClearIcon className='clear-button' onClick={()=>{removeFromCart(item)}}/>
                </div>
            ))}
            <div className='checkout-box'>
            <div className='checkout'>
                <h3>Cart Total</h3>
                <div className='check-out-details'>
                    <div className='checkout-row'>
                    <p>Subtotal</p><p>${cartTotal}</p>
                    </div>
                    <hr/>
                    <div className='checkout-row'>
                    <p>Shipping Fee</p><p>Free</p>
                    </div>
                    <hr/>
                    <div className='checkout-row'>
                    <p>Total</p><p>${cartTotal}</p>
                    </div>
                </div>
                <Link to='/'>
                <button onClick={()=>{handleSubmitOrder()}}>Submit Order</button>
                </Link>
                
            </div>
            </div>
           </>
            )}
        </div>
    )
}

export default CartItems