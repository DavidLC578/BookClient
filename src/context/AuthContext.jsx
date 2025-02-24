import { createContext, useContext, useState, useEffect } from "react";
import { getUser, loginRequest, registerRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkUser = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const res = await getUser();
                    setUser(res.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error obteniendo usuario:", error);
                    setIsAuthenticated(false);
                    Cookies.remove("token");
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 201) {
                setUser(res.data.user);
                setIsAuthenticated(true);
                Cookies.set("token", res.data.token, { expires: 7, secure: true });
            }
        } catch (error) {
            console.error(error.response.data);
            // setErrors(error.response.data.message);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res.status === 201) {
                setUser(res.data.user);
                setIsAuthenticated(true)
                Cookies.set("token", res.data.token, { expires: 7, secure: true });
            }
        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                isAuthenticated,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;