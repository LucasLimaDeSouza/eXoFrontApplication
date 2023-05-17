import { Navigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { useContext } from "react"


export const RoutePrivate = ({children}) => {

    const {user} = useContext(AuthContext)
    
    if (!user || !user.id) {
        
        return <Navigate to='/'/>
        
    }
    
    return <>{children}</>;
}