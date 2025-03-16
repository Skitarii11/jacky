import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLogoSettings.css'

const AdminLogoSettings = ({url}) => {
    const [newLogoUrl, setNewLogoUrl] = useState('');
    const [currentLogoUrl, setCurrentLogoUrl] = useState('');

    useEffect(() => {
        // Fetch the current logo URL when the component mounts
        const fetchLogo = async () => {
            try {
                const response = await axios.get(url + "/api/settings");
                console.log("GET logo settings response:",response);
                setCurrentLogoUrl(response.data.data.logoUrl);
                setNewLogoUrl(response.data.data.logoUrl);
            } catch (error) {
                console.error("Error fetching logo URL:", error);
            }
        };
        fetchLogo();
    }, []);


    const handleUpdateLogo = async () => {
        try {
            // Make sure you have authentication (e.g., send the token in the headers)
            const token = localStorage.getItem('token'); // Or however you store the admin token

            const response = await axios.put(
                url + "/api/settings",
                { logoUrl: newLogoUrl },
                {
                    headers: {
                        token: token,  // Include the token for authentication
                    },
                }
            );

            setCurrentLogoUrl(response.data.data.logoUrl); // Update current logo
            alert("Logo updated successfully!");
        } catch (error) {
            console.error("Error updating logo:", error);
            alert("Error updating logo.");
        }
    };

    return (
        <div>
            <h2>Admin - Logo Settings</h2>
            <div>
                <label>New Logo URL:</label>
                <input
                    type="url"
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                />
            </div>
            <div>
                <img src={newLogoUrl} alt="Preview" style={{ maxWidth: '200px' }} />
            </div>
            <button onClick={handleUpdateLogo}>Update Logo</button>
            <hr />
            <div>
                <h3>Current Logo:</h3>
                <img src={currentLogoUrl} alt="Current Logo" style={{ maxWidth: '200px' }} />
            </div>
        </div>
    );
};

export default AdminLogoSettings;