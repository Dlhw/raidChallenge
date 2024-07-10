import {useLocation, Navigate , Outlet} from "react-router-dom"
import toast from 'react-hot-toast';
import {useState, useEffect} from "react";
const RequireAuth = ({allowedRoles}) => {
    const [loading,setLoading] = useState(true);
    const [auth, setAuth] = useState(null);
    const location = useLocation();

    const getAuth = async() =>{
   
        if(localStorage.getItem("auth-token")===null){
            return {
                token:false
            }
        }
        else{
            const verifyToken = async (token)=>{
                let responseData;
                await fetch('/api/verifyToken',{
                    method:"POST",
                    headers:{
                        'Content-Type':"application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body:JSON.stringify({token}),
                    }).then((response)=>response.json()).then((data)=>responseData=data);
    
                if (responseData.valid){
                    return {
                        role: responseData.decoded.user.role,
                        token:true
                    }
                }
                else{
                    toast.error(responseData.error);
                    localStorage.removeItem("auth-token"); //logs user out
                    return {      
                        token:false   
                    }
                }
            }
            return await verifyToken(localStorage.getItem("auth-token"));
        }
    }


    useEffect(() => {
        const fetchAuth = async () => {
            const authResult = await getAuth();
            setAuth(authResult);
            setLoading(false);
        };
        fetchAuth();
    }, []);
    

    return (
        loading?<div>loading...</div>
        :allowedRoles?.includes(auth?.role)
            ? <Outlet/> 
            : auth?.token
            ? <Navigate to='/unauthorised' state={{from:location}} replace/>
            : <Navigate to='/login' state={{from:location}} replace/>
    )
}

export default RequireAuth;