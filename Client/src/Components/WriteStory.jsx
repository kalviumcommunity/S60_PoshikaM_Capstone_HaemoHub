import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function WriteStory(){

    const [email, setEmail] = useState("");
    const [story, setStory] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCookie = document.cookie;
        const splitedCookie = storedCookie.split("; ");
        const cookieCollection = {};

        for(const cookie of splitedCookie){
            const [prop, value] = cookie.split("=");
            // Decode the cookie value
            cookieCollection[prop] = decodeURIComponent(value);
        }

        // Check if the user cookie exists and parse it
        const userCookie = cookieCollection["user"];
        if(userCookie){
                const parsedUserData = JSON.parse(userCookie);
                console.log("Parsed User Data: ", parsedUserData);
                setUserData(parsedUserData);
                setEmail(parsedUserData.email);
        }else{
            toast.error("Error posting the story")
        }
    }, []);


    const handleStory = (event) => {
        setStory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3006/writeStories", {email, story})
        .then(response => {
            navigate("/")
            toast.success("Posted Successfully")
            setStory("");
        })
        .catch(error => console.log(error))
    }

    return(
        <div>
            <div className='mb-20'>
                <Navbar/>
            </div>
            <div>
                <h1 className="text-red-500 font-medium text-xl mb-5">Share you story</h1>
                <div>
                    {userData ? (
                        <div>
                            <p className="font-medium text-xl mb-3">Shared by : <span className="font-medium text-lg">{userData.email}</span></p>
                        </div>
                    ) : (
                        <div  className="font-medium text-xl mb-3">
                            <h2>No user information found.</h2>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <textarea 
                        onChange={handleStory} name="story" id="story" cols="70" rows="10" placeholder="write here"
                        className="border border-red-500 border-2 rounded-lg mb-3"
                    ></textarea>
                    <p className="text-red-500 font-medium mb-5">*You can share the story only time</p>
                    <button className="place-self-center px-4 py-2 text-white bg-red-700 text-lg font-medium">Post</button>
                </form>
            </div>
        </div>
    )
}

export default WriteStory;