import { useContext, useState } from "react"
import States from "./States"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

function BloodBankSignup(){

    const [blood_bank, setBloodBank] =  useState("");
    const [state, setState] =  useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] =  useState("");
    const [email, setEmail] =  useState("");
    const [contact, setContact] =  useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleBloodBank = (event) => {
        setBloodBank(event.target.value)
    }

    const handleState = (event) => {
        setState(event.target.value)
    }

    const handleCity = (event) => {
        setCity(event.target.value)
    }

    const handleAddress = (event) => {
        setAddress(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleContact = (event) => {
        setContact(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSignup = (event) => {
        event.preventDefault()

        axios.post("http://localhost:3006/BloodBankSignup", { blood_bank, state, city, address, email, contact, password })
        .then(response => {
            navigate('/')
            setUser(response.data)
            toast.success("Signup Successful!")
        })
        .catch(error => {
            if(error.response){
                setError(error.response.data.errors)
                // console.log(error.response.data.errors)
            }else{
                setError({ general : "Unexpected error occured. Try again"})
            }
        })
    }

    return(
        <div>
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                        <h5>Blood Bank Register</h5>
                    </div>
                </div>
            </div>
            <div className="flex-auto p-6">
                <form role="form text-left" onSubmit={handleSignup}>
                    <div className="mb-4">
                        <input 
                            onChange={handleBloodBank}
                            type="text"
                            placeholder="Blood Bank Name"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                        />
                        {error.blood_bank && <p className="text-red-500">{error.blood_bank.message}</p>}
                    </div>
                    <div className="mb-4">
                        <States handleState={handleState}/>
                        {error.state && <p className="text-red-500">{error.state.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handleCity}
                            type="text" 
                            placeholder="City"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                        />
                        {error.city && <p className="text-red-500">{error.city.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handleAddress}
                            type="text" 
                            placeholder="Address"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                        />
                        {error.address && <p className="text-red-500">{error.address.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handleEmail}
                            type="email" 
                            placeholder="Email"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                        {error.email && <p className="text-red-500">{error.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handleContact}
                            type="tel" 
                            placeholder="Contact Number"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                        {error.contact && <p className="text-red-500">{error.contact.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input 
                            onChange={handlePassword}
                            type="password" 
                            placeholder="Password"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                        {error.password && <p className="text-red-500">{error.password.message}</p>}
                    </div>
                    <div className="text-center">
                            <button className="inline-block w-full px-6 py-3 mt-2 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-red-700 border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="submit">Sign up</button>
                    </div>
                    <div>
                        <p className="mt-4 mb-0 leading-normal text-sm">Already registered Blood Bank? <Link to='/BloodBankLogin'><b className="font-bold text-red-600">Log in</b></Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BloodBankSignup