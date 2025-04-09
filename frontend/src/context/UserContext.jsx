import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);


    async function registerUser(name, email, password, navigate) {
        setbtnLoading(true); // Start loading
        try {
            const { data } = await axios.post("/api/user/register", {name,  email, password }); // ✅ fixed: added slash

            toast.success(data.message); // fixed typo: "success"
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed"); // ✅ safe access
        } finally {
            setbtnLoading(false); // Stop loading
        }
    }

    async function loginUser(email, password, navigate) {
        setbtnLoading(true); // Start loading
        try {
            const { data } = await axios.post("/api/user/login", { email, password }); // ✅ fixed: added slash

            toast.success(data.message); // ✅ fixed typo: "success"
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed"); // ✅ safe access
        } finally {
            setbtnLoading(false); // Stop loading
        }
    }

    const [loading,setLoading] = useState(true)

    async function fetchUser(){
        try{
            const {data} = await axios.get("/api/user/me")

            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser()
    }, []);
    return (
        <UserContext.Provider value={{ loginUser, btnLoading, isAuth, user, loading, registerUser }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
