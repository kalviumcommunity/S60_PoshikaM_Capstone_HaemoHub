import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()

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
        event.preventDefault()
        clearCookies()

        try{const response = await axios.post("http://localhost:3006/Login", { email, password })
            if(response.data.error){
                toast.error("Login failed " + response.data.error)
            }else{
                // setUser(...response.data)
                setUser({...response.data.user});
                document.cookie = `token=${response.data.token}; path=/; expires=${new Date(Date.now() + 86400000).toUTCString()}; SameSite=Lax;`;
                toast.success("Login Successful!")
                navigate("/")
            }
        }
        catch(err){
            console.log("error", err)
        }
    }

    return(
        <div>
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                    <h2>Login with</h2>
                </div>
                <div className="flex-auto p-6">
                    <form role="form text-left" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input 
                                onChange={handleEmail}
                                aria-describedby="email-addon" 
                                aria-label="Email" 
                                placeholder="Email"
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="email"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                onChange={handlePassword}
                                aria-describedby="password-addon" 
                                aria-label="Password" 
                                placeholder="Password" 
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="password"
                            />
                        </div>
                        <div className="text-center">
                            <button className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-red-700 border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="submit">Log in</button>
                        </div>
                        <p className="mt-4 mb-0 leading-normal text-sm">Don't have an account? <a className="font-bold text-red-600" href="./signup">Sign up</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;