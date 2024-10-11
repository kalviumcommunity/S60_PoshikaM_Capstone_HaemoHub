import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Dropdown from "./Dropdown";
import ProfileUpdateButton from "./ProfileUpdateBtn";

function Navbar() {
    const { user } = useContext(UserContext)

    return(
        <nav className="justify-around inset-x-0 top-0 fixed shadow-md bg-red-50">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-10 w-auto rounded-full" src="../src/assets/BloodIcon.png" alt="BloodIcon" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/signup">
                                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium text-lg">Signup</button>
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
                                <Link to="/BloodBankSignup">
                                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium text-lg">Having a Blood Bank? Signup</button>
                                </Link>
                                <Link to="/AboutUs">
                                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium text-lg">About Us</button>
                                </Link>
                                <Link to="/Stories">
                                    <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium text-lg">Read Stories</button>
                                </Link>
                                {user?.role === "user" && (
                                    <Link to="/writeStory">
                                        <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non text-lg font-medium text-lg">Write Story</button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to="/Search">
                            <button type="button">
                                <img className="w-10 h-10 rounded-full" src="../src/assets/Search.png" alt="" />
                            </button>
                        </Link>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div className="flex justify-end">
                                {user?.role === "bloodbank" && (
                                    <Dropdown/>
                                )}
                            </div>
                            <div className="flex justify-end">
                                {user?.role === "user" && (
                                    <ProfileUpdateButton/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
