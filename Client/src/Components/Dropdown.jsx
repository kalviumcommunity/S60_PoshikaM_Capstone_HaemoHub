import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dropdown() {

    const[isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible)
    }

    const Logout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/BloodBankSignup")
        window.location.reload()
    }

    return (
        <div className="relative inline-block">
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-red-600 bg-white-700 border-2 border-red-600 hover:text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                <img className="size-16 h-10" src="https://i.postimg.cc/nrDKD9jq/Untitled.png" alt="" />
                <svg
                className="w-3 h-3 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                >
                <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
                />
                </svg>
            </button>

            {isDropdownVisible && (
                <div
                    id="dropdown"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"    
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <Link to="/BloodStockUpdate">
                                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    BloodStockUpdate
                                </p>
                            </Link>
                        </li>
                        <li>
                            <p onClick={Logout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Logout
                            </p>
                        </li>
                    </ul>   
                </div>
            )}
        </div>
  );
}

export default Dropdown;