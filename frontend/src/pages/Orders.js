import {useState,useEffect} from 'react';
import './CSS/Orders.css'
import OrderItems from '../components/OrderItems/OrderItems';

 
const Orders = (props) => {
    const [orders, setOrders] = useState([]);

    const cancelOrder = (orderId) => {
        // After a successful response, update the state to remove the canceled order
        setOrders(orders.filter(order => order._id !== orderId));
    };
    useEffect(()=>{
        props.setMenu("Orders")
        const fetchOrders = async ()=>{
            const response = await fetch('/api/order')
            const json = await response.json()

            if (response.ok){
                console.log(json);
                setOrders(json)
            }
        }
        fetchOrders();
    }, [])
    return (
        
        <div className='order'>
            <div className='order-cols'>
                <p>From Userid</p>
                <p>Purchased</p>
                <p>Shipping Details</p>
                <p>Total Sales</p>
                <p>Date</p>
                <p>Fulfill/Cancel</p>
            </div>
        <hr />
        {orders && orders.length === 0?<div className='noOrders'><h1>No Orders</h1></div>:
        <div className="order-items">
            {orders && Array.isArray(orders) && orders.map((order) => (
               <OrderItems key={order._id} order={order} onCancel={cancelOrder}/>
            ))}
            
        </div>}
    </div>
    );
}

export default Orders;