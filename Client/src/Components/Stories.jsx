import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import toast from 'react-hot-toast';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [editingStory, setEditingStory] = useState(null);
    const [updatedStory, setUpdatedStory] = useState("");

    useEffect(() => {
        const storedCookie = document.cookie;
        const splitedCookie = storedCookie.split("; ");
        const cookieCollection = {};

        for (const cookie of splitedCookie) {
            const [prop, value] = cookie.split("=");
            cookieCollection[prop] = decodeURIComponent(value);
        }

        // Check if the user cookie exists and parse it
        const userCookie = cookieCollection["user"];
        if (userCookie) {
            try {
                const parsedUserData = JSON.parse(userCookie);
                setUserEmail(parsedUserData.email);
            } catch (error) {
                console.error('Error parsing user cookie:', error);
            }
        } else {
            toast.error("Error retrieving user information.");
        }
    }, []);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('http://localhost:3006/stories');
                setStories(response.data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    const handleUpdate = (story) => {
        setEditingStory(story)
        setUpdatedStory(story.story)
    };

    const handleStory = (event) => {
        setUpdatedStory(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!updatedStory.trim()){
            toast.error("Story cannot be empty");
            return;
        }

        try{
            const response = await axios.put(`http://localhost:3006/stories/${editingStory._id}`, {
                email : editingStory.email,
                story : updatedStory
            })

            if(response.status === 200){
                setStories(stories.map(story => story._id === editingStory._id ? response.data : story));
                toast.success("Story Updated Successfully");
                setEditingStory(null);
            }
        }catch(error){
            console.error("Error updating story:", error)
            toast.error("Error updating story")
        }
    }

    const handleDelete = async (storyId) => {
        if(window.confirm("Are you sure you want to delete this story?")){
            try{
                const response = await axios.delete(`http://localhost:3006/stories/${storyId}`);
                if(response.status === 200){
                    setStories(stories.filter(story => story._id !== storyId));
                    toast.success("Story deleted successfully")
                }
            }catch(error){
                console.error('Error deleting story:', error);
                toast.error('Error deleting story')
            }
        }
    }

    return (
        <div>
            <div className='mb-20'>
                <Navbar/>
            </div>
            <div>
                <h1 className="text-red-500 font-medium text-xl mb-5">Stories</h1>
                <ul>
                    {stories.map((story) => (
                        <li key={story._id} className='bg-red-50 mb-8 px-8 pt-8 pb-3 rounded-md'>
                            <p className='mb-3 text-xl'>{story.story}</p>
                            <p className='mb-2'>Shared by : {story.email}</p>
                            <small>Posted on : {new Date(story.timestamp).toLocaleString()}</small>

                            {userEmail === story.email && (
                                <div className="mt-4">
                                    <button 
                                        className="text-blue-700 px-4 py-2 rounded mr-2 hover:text-white hover:bg-blue-700"
                                        onClick={() => handleUpdate(story)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="text-red-600 px-4 py-2 rounded hover:text-white hover:bg-red-600"
                                        onClick={() => handleDelete(story._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {editingStory && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h1 className="text-lg font-semibold mb-4">Edit your story</h1>
                            <textarea 
                                value={updatedStory}
                                onChange={handleStory}
                                rows="8"
                                className="w-full p-2 border rounded mb-4"
                            ></textarea>
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-3"
                                onClick={() => {setEditingStory(null)}}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stories;