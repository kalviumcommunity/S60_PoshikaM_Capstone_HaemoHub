import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <Link to="./signup">
                <button>Signup</button>
            </Link>
            <Link to="./login">
                <button>Login</button>
            </Link>
            <Link to="./donorSignup">
                <button>Donor Signup</button>
            </Link>
            <Link to="./donorLogin">
                <button>Donor Login</button>
            </Link>
        </div>
    )
}

export default Navbar;