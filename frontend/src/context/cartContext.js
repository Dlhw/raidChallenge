import { createContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({
                                        });
export const updateCart = async(newCart,userid) =>{
    try{
        const createCart = await fetch('/api/cart/'+userid,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newCart)
        });
        if (createCart.ok){
            console.log("Cart updated!")
        }
        else{
            console.error("Failed to update Cart");
        }
    } catch(error){
        console.error(error);
    }
}

export const deleteCart = async(userid) =>{
    try{
        const createCart = await fetch('/api/cart/'+userid,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if (createCart.ok){
            console.log("Cart Deleted!")
        }
        else{
            console.error("Failed to delete Cart");
        }
    } catch(error){
        console.error(error);
    }
}

export const postCart = async(newCart) =>{
    try{
        const createCart = await fetch('/api/cart/',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newCart)
        });
        if (createCart.ok){
            console.log("New cart created!")
        }
        else{
            console.error("Failed to create Cart");
        }
    } catch(error){
        console.error(error);
    }
    
}

export const getCart = async(userid) =>{
    let responseData;
    await fetch('/api/cart/'+userid,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((response)=>response.json()).then((data)=>responseData=data);
    console.log(responseData);
    if (responseData.success){
        return responseData.cart;
    }
    else{
        return {
            userid:"",
            qty_price:{}
        };
    }
}

export const updateOrder = async(newCart,userid) =>{
    try{
        const createCart = await fetch('/api/order/'+userid,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newCart)
        });
        if (createCart.ok){
            toast.success("Order Updated")
        }
        else{
            console.error("Failed to update Order");
        }
    } catch(error){
        console.error(error);
    }
}

export const deleteOrder = async(id) =>{
    try{
        const createCart = await fetch('/api/order/'+id,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if (createCart.ok){
            toast.success("Order Deleted!");
        }
        else{
            console.error("Failed to delete Order");
        }
    } catch(error){
        console.error(error);
    }
}

export const postOrder = async(newOrder) =>{
    try{
        const createOrder = await fetch('/api/order/',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newOrder)
        });
        
        if (createOrder.ok){
            console.log("New Order created!")
        }
        else{
            console.error("Failed to create Order");
        }
    } catch(error){
        console.error(error);
    }
    
}

export const getOrder = async(userid) =>{
    let responseData;
    await fetch('/api/order/'+userid,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((response)=>response.json()).then((data)=>responseData=data);
    console.log(responseData);
    
    return responseData;

}

export const getOrders = async() =>{
    let responseData;
    await fetch('/api/order/',{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((response)=>response.json()).then((data)=>responseData=data);
    console.log(responseData);
    return responseData;

}

export const updateFruit = async(newStock,id) =>{
    try{
        const updateFruit = await fetch('/api/fruitstore/'+id,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newStock)
        });
        if (updateFruit.ok){
            console.log("Fruit updated!")
        }
        else{
            console.error("Failed to update Fruit");
        }
    } catch(error){
        console.error(error);
    }
}