import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Search() {
    const [bloodBankData, setBloodBankData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3006/getData")
            .then((response) => {
                if (response.data.bloodBankData) {
                    setBloodBankData(response.data.bloodBankData);
                } else if (response.data.error) {
                    setError(response.data.error);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const filteredData = searchTerm ? bloodBankData.filter((item) =>
        item?.blood_bank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.blood_group?.toLowerCase().includes(searchTerm.toLowerCase()) 
    ) : [];

    return (
        <div>
            <div className='mb-20'>
                <Navbar/>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    className='shadow-lg w-96 h-10 place-content-center bg-neutral-100 rounded-xl text-slate-800'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {error && <p>{error}</p>}

            <div className="grid gap-6 mt-10 mb-10">
                <ul className="space-y-4">
                    {filteredData.map((item) => (
                        <li key={item._id} className="border border-red-600 p-4 rounded-lg shadow-md bg-white">
                            <p className="font-semibold text-lg">{item.blood_bank}</p>
                            <p>{item.state}</p>
                            <p>{item.blood_group}</p>
                            <p>{item.units_available}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <img className='rounded-lg' src="https://citizenadvocates.net/wp-content/uploads/2024/01/donating-blood_donation-areas-in-New-York_Citizen-Advocates-community-action-e1704411064175.png" alt="" />
            </div>
        </div>
    );
}

export default Search;
