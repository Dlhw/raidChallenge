import "./CSS/LoginSignup.css";
import {useState, useContext} from 'react';
import toast from 'react-hot-toast';
import { CartContext,getCart} from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const LoginSignup = (props) => {
    const {cart,setCart} = useContext(CartContext);
    const [state,setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const login = async()=>{
        let responseData;
        await fetch('/api/user/login',{
            method:"POST",
            headers:{
                Accept:'application/form-data',
                'Content-Type':"application/json",
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);
        console.log(responseData)
        if (responseData.success){
            console.log("logged in")
            localStorage.setItem('auth-token',responseData.token);
            const decoded = jwtDecode(responseData.token);
            const role = decoded.user.role;
            if (role === 1){
                props.setMenu(props.ownerBar[0]);
                props.setItems(props.ownerBar)
            }
            else{
                props.setMenu(props.customerBar[0]);
                props.setItems(props.customerBar)
            }
            navigate("/");

            const tempCart = await getCart(decoded.user.id);
            console.log(tempCart)
            if (Object.keys(tempCart).length !==0){
                setCart(tempCart);
            }
            console.log(cart);
        }
        else{
            toast.error(responseData.error);
        }
    }

    const signUp = async()=>{
        let responseData;
        await fetch('/api/user/register',{
            method:"POST",
            headers:{
                Accept:'application/form-data',
                'Content-Type':"application/json",
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        if (responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            navigate("/");
        }
        else{
            toast.error(responseData.error);
        }
    }

    return (
        <div className="loginSignup">
            <div className="loginSignup-container">
                <h1>{state}</h1>
                <div className="loginSignUp-details">
                    {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Name"/>:<></>}
                    <input name='email' value= {formData.email} onChange={changeHandler} type="email" placeholder="Email address"/>
                    <input name='password' value= {formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={()=>{state==="Login"?login():signUp()}}>Continue</button>
                {state ==="Sign Up"?
                <p className="loginSignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
                :
                <p className="loginSignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
                }
            </div>
        </div>
    )
}

export default LoginSignup