import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="flex flex-row gap-x-40 inset-x-0 place-content-center top-0 fixed border border-orange-600">
            <Link to="./signup">
                <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non">Signup</button>
            </Link>
            <Link to="./login">
                <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non">Login</button>
            </Link>
            <Link to="./donorSignup">
                <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non">Donor Signup</button>
            </Link>
            <Link to="./donorLogin">
                <button className="text-red-600 bg-white-700 px-4 py-2 transition duration-200 ease-in-out hover:text-white hover:bg-red-700 active:bg-red-700 focus:outline-non">Donor Login</button>
            </Link>
        </div>
    )
}

export default Navbar;