import { useState } from "react";
import axios from "axios";

function Signup(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const [error, setError] = useState({})

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirm = (event) => {
        setConfirm(event.target.value)
    }

    const handleSignup = (event) => {
        event.preventDefault()

        axios.post("http://localhost:3006/signup", { name, email, password, confirmPassword })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            if(error.response && error.response.data && error.response.data.errors){
                setError(error.response.data.errors)
            }else{
                setError({ general : "Unexpected error ocurred" })
            }
        })
    }

    return(
        <div>
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                        <h5>Register with</h5>
                    </div>
                </div>
                <div className="flex-auto p-6">
                    <form role="form text-left" onSubmit={handleSignup}>
                        <div className="mb-4">
                            <input
                                onChange={handleName}
                                aria-describedby="email-addon" 
                                aria-label="Name" 
                                placeholder="Name" 
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="text"
                            />
                            {error.name && <p className="text-red-600">{error.name.message}</p>}
                        </div>
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
                        {error.email && <p className="text-red-600">{error.email.message}</p>}
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
                        {error.password && <p className="text-red-600">{error.password.message}</p>}
                        <div className="mb-4">
                            <input
                            onChange={handleConfirm}
                                aria-describedby="confirm-password-addon" 
                                aria-label="Confirm Password" 
                                placeholder="Confirm Password" 
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="password"
                            />
                        </div>
                        {error.confirmPassword && <p className="text-red-600">{error.confirmPassword.message}</p>}
                        <div className="text-center">
                            <button className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-red-700 border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="submit">Sign up</button>
                        </div>
                        <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <a className="font-bold text-red-600" href="./login">Log in</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;