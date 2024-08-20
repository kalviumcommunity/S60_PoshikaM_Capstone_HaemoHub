import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Dropdown from "./Dropdown";

function Navbar(){

    const { user } = useContext(UserContext)
    
    return(
        <div className="flex flex-row justify-around inset-x-0 top-0 fixed shadow-md">
            <div className="flex flex-row">
                <Link to="./signup">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">Signup</button>
                </Link>
                {/* <Link to="./Login">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">Login</button>
                </Link> */}
                {/* <Link to="./DonorSignup">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">Donor Signup</button>
                </Link> */}
                {/* <Link to="./DonorLogin">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">Donor Login</button>
                </Link> */}
                <Link to="./BloodBankSignup">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">Having a Blood Bank? Signup</button>
                </Link>
                <Link to="./AboutUs">
                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium">About Us</button>
                </Link>
            </div>
            <div className="flex justify-end">
                {user?.role === "bloodbank" && (
                    <Dropdown/>
                )}
            </div>
        </div>
    )
}

export default Navbar;