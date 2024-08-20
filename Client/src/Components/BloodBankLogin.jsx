import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function BloodBankLogin(){

    const [blood_bank, setBloodBank] =  useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()

    const handleBloodBank = (event) => {
        setBloodBank(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const clearCookies = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        clearCookies();
        
        try{const response = await axios.post("http://localhost:3006/BloodBankLogin", { blood_bank, email, password })
        if (response.data.error) {
            toast.error("Login failed: " + response.data.error);
        } else {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUser(response.data)
            navigate("/")
            toast.success("Login Successful!")
            // console.log("User data:", response.data);
            document.cookie = `token=${response.data.token}; path=/; expires=${new Date(Date.now() + 86400000).toUTCString()}; SameSite=Lax;`;

        }}
        catch(err){
            console.log("error",err)
        }
    }

    return(
        <div>
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                        <h5>Blood Bank Login</h5>
                    </div>
                </div>
            </div>
            <div className="flex-auto p-6">
                <form role="form text-left" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input 
                            onChange={handleBloodBank}
                            type="text"
                            required
                            placeholder="Blood Bank Name"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handleEmail}
                            type="email"
                            required
                            placeholder="Email"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handlePassword}
                            type="password"
                            required
                            placeholder="Password"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                    </div>
                    <div className="text-center">
                        <button className="inline-block w-full px-6 py-3 mt-2 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-red-700 border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="submit">Login</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default BloodBankLogin