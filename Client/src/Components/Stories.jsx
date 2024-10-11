import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Stories = () => {
    const [stories, setStories] = useState([]);

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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stories;