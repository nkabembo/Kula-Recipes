import {createContext, useState, useEffect} from "react";
import axios from "axios"
export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user"))|| null);
    const login = async(inputs)=>{
        const res = await axios.post("api/auth/Login", inputs, { withCredentials: true })
        setCurrentUser(res.data)
        const {message, success} = res.data
        return {message, success}
    }
    const logout = async(inputs)=>{
        await axios.post("api/auth/Logout")
        setCurrentUser(null)
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

//export default AuthContextProvider;