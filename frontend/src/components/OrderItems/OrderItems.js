import './OrderItems.css'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { deleteOrder, getOrders, updateOrder,  updateFruit} from '../../context/cartContext'
import { useState } from 'react';

const OrderItems = ({order,onCancel}) =>{
    const [fulfilled,setFulfilled] = useState(order.fulfilled);
    const handleFulfill =(order) =>{
        order = {
            ...order,
            fulfilled:true
        }
        updateOrder(order,order._id);
        setFulfilled(order.fulfilled);

    }
    console.log(order);
    const handleCancel =(order) =>{
        const fetchFruits = async ()=>{
            const response = await fetch('/api/fruitstore')
            const result = await response.json()

            if (response.ok){
                Object.keys(order.qty_price).forEach(item => {
                    // Check if the item exists in result.stock
                    if (result[0].stock[item]) {
                        // Add back the stock
                        let newStock = result[0].stock[item].stock + order.qty_price[item].qty;
                
                        // Update result.stock with remaining stock
                        result[0].stock[item].stock = newStock;
                    }
                });
                updateFruit(result[0],result[0]._id); 
            }
        }
        fetchFruits();
        deleteOrder(order._id);
        onCancel(order._id);
    }

    return (
        <div>
            <div key={order._id} className='cartItems-row order-cols'>
                <p>{order.userid}</p>
                <div className="purchased-details">
                    <div className="header-row">
                        <p>Item</p>
                        <p>Qty</p>
                        <p>Price</p>
                    </div>
                    {order.qty_price && Object.entries(order.qty_price).map(([item, details]) => (
                        <div key={item} className="order-details">
                            <p>{item}</p>
                            <p>{details.qty}</p>
                            <p>${details.price}</p>
                        </div>
                    ))}
                </div>
                <p> {order.shipping_details || 'N/A'}</p>
                <p>${order.cartTotal}</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                {fulfilled? <p>Fulfilled</p> :
                <div className='actions'>
                <CheckCircleOutlineIcon className='fulfill-button' fontSize='large' onClick={()=>{handleFulfill(order)}}/><p>/</p>
                <CancelOutlinedIcon className='cancel-button' fontSize='large' onClick={()=>{handleCancel(order)}} />
                </div>}
                
            </div>
            <hr></hr>
        </div>
    )
}

export default OrderItems