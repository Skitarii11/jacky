import './AdminLogoSettings.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogoSettings = ({url}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [currentLogoUrl, setCurrentLogoUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the current logo URL when the component mounts
        const fetchLogo = async () => {
            try {
                const response = await axios.get(url + "/api/settings");
                setCurrentLogoUrl(response.data.data.logoUrl);
                setPreviewUrl(response.data.data.logoUrl); // Initialize the preview with current logo
            } catch (error) {
                console.error("Error fetching logo URL:", error);
            }
        };
        fetchLogo();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };


    const handleUpdateLogo = async () => {
        if (!selectedFile) {
            alert("Please select an image.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("logo", selectedFile); // The key 'logo' must match what your backend expects

            const token = localStorage.getItem('token'); // Or however you store the admin token

            const response = await axios.put(
                url + "/api/settings",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important
                        token: token,  // Include the token for authentication
                    },
                }
            );

            setCurrentLogoUrl(response.data.data.logoUrl); // Update current logo
            setLoading(false);
            alert("Logo updated successfully!");
        } catch (error) {
            console.error("Error updating logo:", error);
            setLoading(false);
            alert("Error updating logo.");
        }
    };

    return (
        <div>
            <h2>Admin - Logo Settings</h2>
            <div>
                <label>Select New Logo:</label>
                <input
                    type="file"
                    accept="image/*" // Only allow image files
                    onChange={handleFileChange}
                />
            </div>
            <div>
                {previewUrl && (
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px' }} />
                )}
            </div>
            <button onClick={handleUpdateLogo} disabled={loading}>
                {loading ? "Updating..." : "Update Logo"}
            </button>
            <hr />
            <div>
                <h3>Current Logo:</h3>
                <img src={currentLogoUrl} alt="Current Logo" style={{ maxWidth: '200px' }} />
            </div>
        </div>
    );
};

export default AdminLogoSettings;