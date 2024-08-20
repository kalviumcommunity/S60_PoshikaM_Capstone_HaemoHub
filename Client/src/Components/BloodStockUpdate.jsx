import { useState } from "react"
import States from "./States"
import BloodGroups from "./BloodGroups"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BloodStockUpdate(){

    function getTokenFromCookie(cookieName) {
        const name = `${cookieName}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookiesArray = decodedCookie.split(';');
        
        for (let cookie of cookiesArray) {
          cookie = cookie.trim();
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return null;
    }
      
    const token = getTokenFromCookie('token');
    const userCookie = getTokenFromCookie('user');

    let loggedInUser = null;
    if (userCookie) {
        try {
            loggedInUser = JSON.parse(decodeURIComponent(userCookie));
        } catch (error) {
            console.log("Error parsing user cookie", error);
        }
    }

    const [state, setState] = useState("")
    const [blood_group, setBloodGroup] = useState("")
    const [units_available, setUnitsAvailable] = useState("")
    const [blood_bank, setBloodBank] = useState("")
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleState = (event) => {
        setState(event.target.value)
    }

    const handleBloodGroup = (event) => {
        setBloodGroup(event.target.value)
    }

    const handleUnits = (event) => {
        setUnitsAvailable(event.target.value)
    }

    const handleBloodBank = (event) => {
        setBloodBank(event.target.value)
    }

    const handleStockSubmit = (event) => {
        event.preventDefault()

        if (loggedInUser && loggedInUser.blood_bank !== blood_bank) {
            toast.error("Blood bank name does not match with the logged in bloodbank name.");
            return;
        }

        axios.post(
            "http://localhost:3006/BloodStockUpdate", { state, blood_group, units_available, blood_bank },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )  
        .then(response => {
            toast.success("Blood Data details uploaded.")
            setError({})
            navigate("/")
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error("You are not authorized. Signup to Update");
                } else if (error.response.data.errors) {
                    setError(error.response.data.errors);
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } else {
                toast.error("Internal server error. Try again");
            }
        })
    }

    return(
        <div>
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                        <h5>Blood Stock Update</h5>
                    </div>
                </div>
                <div className="flex-auto p-6">
                    <form role="form text-left" onSubmit={handleStockSubmit}>
                        <div className="mb-4">
                            <States handleState={handleState}/>
                        </div>
                        
                        <div className="mb-4">
                            <BloodGroups handleBloodGroup={handleBloodGroup}/>
                        </div>

                        <div className="mb-4">
                            <input 
                                onChange={handleUnits}
                                type="number"
                                required
                                placeholder="Units available"
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                onChange={handleBloodBank}
                                type="text"
                                required
                                placeholder="Blood Bank Name"
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            />
                        </div>

                        <div>
                            <button className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-red-700 border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="submit">Register Blood Bank</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BloodStockUpdate