import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

function UserContextProvider({children}){
    const [user, setUser] = useState(null);

    // Function to set the cookie
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    // Function to get the cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if(parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Save user data to cookies whenever state changes
    useEffect(() => {
        if(user){
            setCookie("user", JSON.stringify(user), 1);
        }
    }, [user])

    // Load user data from cookies
    useEffect(() => {
        const savedUser = getCookie("user");
        if(savedUser){
            try{
                const decodeUser = decodeURIComponent(savedUser);
                setUser(JSON.parse(decodeUser));
            }catch(error){
                console.log("Error parsing user cookie", error);
            }
        }
    }, [])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}