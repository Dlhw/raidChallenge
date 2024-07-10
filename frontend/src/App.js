import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Toaster} from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
//context
import { CartContext } from './context/cartContext'

//pages
import Home from "./pages/Home"
import Orders from "./pages/Orders"
import LoginSignup from './pages/LoginSignup'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Unauthorised from './pages/Unauthorised'
import Sales from "./pages/Sales"


// components
import Navbar from './components/Navbar/Navbar'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'

function App() {
  const [cart,setCart] = useState({
                                    userid:'',
                                    qty_price:{}
                                  });
  const [inCart, setInCart] = useState(false);
  const [menu,setMenu] = useState('');
  const [items,setItems] = useState([]);
  const customerBar =[];
  const ownerBar = ["Shop","Orders", "Sales"];
  
  useEffect(()=>{
    const token = localStorage.getItem('auth-token');
    if (token){
      const decoded = jwtDecode(token);
      const role = decoded.user.role;
      if (role === 1){
          setMenu(ownerBar[0]);
          setItems(ownerBar)
      }
      else{
          setMenu(customerBar[0]);
          setItems(customerBar)
      }
    }
  },[])
  return (
    <div className="App">
      <CartContext.Provider value={{cart,setCart,inCart,setInCart}}>
      <BrowserRouter>
        <Navbar
          items={items}
          setItems={setItems}
          menu={menu}
          setMenu={setMenu}
        />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Layout/>}>

              {/* public paths */}
              <Route 
                path='/' 
                element={<Home/>}
              />
              {/* Redirect /shop to / */}
              <Route
                  path="/shop"
                  element={<Navigate to="/" />}
              />
              <Route 
                path='/login' 
                element={<LoginSignup
                setItems={setItems}
                setMenu={setMenu}
                ownerBar={ownerBar}
                customerBar={customerBar}
                />}
              />
              <Route 
                path='/unauthorised' 
                element={<Unauthorised/>}
              />

              {/* requires login */}
              <Route element={<RequireAuth allowedRoles={[1,2]}/>}>
                <Route 
                  path='/cart' 
                  element={<Cart setMenu={setMenu}/>}
                />
                <Route 
                  path='/checkout' 
                  element={<Checkout/>}
                />
              </Route>
              {/* requires admin */}
              <Route element={<RequireAuth allowedRoles={[1]}/>}>
              <Route 
                path='/Orders' 
                element={<Orders setMenu={setMenu}/>}
              />
              <Route 
                path='/Sales' 
                element={<Sales/>}
              />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      </CartContext.Provider>
      <Toaster position='bottom-right' toastOptions={{
        duration:2000
      }}/>
    </div>
  );
}

export default App;
