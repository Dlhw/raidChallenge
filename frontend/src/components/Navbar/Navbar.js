import {Link, useNavigate} from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import { useContext, useState, useEffect} from 'react'
import logo from '../../assets/raid_logo.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Navbar.css'

const Navbar = (props) => {

    const {cart,inCart,setCart} = useContext(CartContext);
    const navigate = useNavigate();

    const handleCartClick= (event) => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            event.preventDefault();
            navigate("/login");
        } else {
            navigate("/cart");
        }
    }

    return(
        <header>
            <div className="navbar">
                <div className='nav-description'>
                <Link to="/">
                    <img className='nav-logo' src={logo} alt='logo'/>
                </Link>
                <hr/>
                <p>{inCart?"Shopping Cart":"Shop"}</p>
                </div>
                
                <ul className='nav-menu'>
                    {props.items.map((item,index)=>(
                        <li key={index} onClick={()=>{props.setMenu(item);}}><Link to={"/"+item}>{item}</Link>{props.menu===item?<hr/>:<></>}</li>
                    ))}
                </ul>
                <div className='nav-login-cart'>
                    {localStorage.getItem("auth-token")?
                    <button onClick={()=>{
                        localStorage.removeItem("auth-token");
                        setCart({userid:"",qty_price:{}});
                        props.setItems([]);
                        props.setMenu('');
                        navigate("/");
                    }}>Logout</button>:
                    <Link to='/login'>
                    <button>Login</button>
                    </Link>}
                    
                    <Link to='/cart' onClick={(event) => handleCartClick(event)}>
                    <ShoppingCartOutlinedIcon sx={{fontSize: 45}}/>
                    </Link>
                    {localStorage.getItem("auth-token")?
                    <div className='nav-cart-count'>
                        {Object.keys(cart.qty_price||{}).length}
                    </div>
                    :<></>}
                </div>
            </div>
        </header>
    )
}

export default Navbar;