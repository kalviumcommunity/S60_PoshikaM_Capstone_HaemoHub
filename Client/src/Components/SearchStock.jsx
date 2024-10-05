import Navbar from "./Navbar";
import Footer from "./Footer";

function SearchStock(){

    return(
        <div>
            <div className="mb-20">
                <Navbar/>
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-6">"Save Lives, Donate Blood"</h1>
                <img className="rounded-lg" src="./src/assets/Blood.png" alt="" />
            </div>
            <div className="mt-10 inset-x-0 bottom-0">
                <Footer/>
            </div>
        </div>
    )
}

export default SearchStock;