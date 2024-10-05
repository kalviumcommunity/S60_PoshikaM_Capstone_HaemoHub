import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

function ProfileUpdateButton() {

    const[isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible)
    }

    const { user } = useContext(UserContext)
    const [image, setImage] = useState(null)

    const upload = async() => {
        if(!image){
                alert("Please select a photo.")
                return
            }
            try{
                let url = ""
                // console.log("ima", image)
                // console.log("user object before upload:", user);

                if(image){
                    const form = new FormData()
                    form.append("file", image)
                    form.append("upload_preset", "HaemoHub")
    
                    const photo = await axios.post(
                        "https://api.cloudinary.com/v1_1/dmwjyqhqq/image/upload",
                        form
                      );
                    url = photo.data.secure_url
                    // console.log("hello",url)
                    // console.log("url")
                    await axios.post('http://localhost:3006/upload-profile-image', { user, imageUrl: url });
                    // console.log("Profile image updated successfully!");
                }
            }
            catch(err){
                console.log(err)
            }
    }

    const handleImage = async(event) => {
        setImage(event.target.files[0])
        // upload()
    }

    const Logout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/signup")
        window.location.reload()
    }

    return (
        <div className="relative inline-block">
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="bg-white-700 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-full text-sm w-10 h-10 text-center inline-flex items-center justify-center"
                type="button"
            >
            <img className="size-16 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2bIclL_1-V3F_9uyBPWCGxMDQbLBvDxMjvxYaY2zw3-w3kkv8whtLWjHcjAM4olR93Tc&usqp=CAU" alt="" />
            </button>

            {isDropdownVisible && (
                <div>
                    <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <label htmlFor="image">
                                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        <input onChange={handleImage} type="file" id="image" accept="image/*" className="hidden"/>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <p onClick={upload} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Upload Image (Click)
                                </p>
                            </li>
                            <li>
                                <p onClick={Logout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Logout
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ProfileUpdateButton;