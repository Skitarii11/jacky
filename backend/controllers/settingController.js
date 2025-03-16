import settingModel from "../models/settingModel.js"
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'), false);
        }
    }
}).single('logo'); // 'logo' is the name of the field in the form

const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne({}); // Assuming only one settings document
        if (!settings) {
            // If no settings exist, create a default one
            settings = new Setting({ logoUrl: '/images/default-logo.png' });
            await settings.save();
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.error("Error getting settings:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve settings" });
    }
};

const updateSettings = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Generate the image URL (using a local file path or a cloud storage URL)
        const logoUrl = `/uploads/${req.file.filename}`; // Example: Store the local file path in the database

        const settings = await Setting.findOneAndUpdate(
            {}, // Find the first document
            { logoUrl: logoUrl }, // Update the logo URL
            { upsert: true, new: true, setDefaultsOnInsert: true } // Create if it doesn't exist, return the updated document, and apply schema defaults
        );

        res.status(200).json({ success: true, message: "Settings updated successfully", data: settings });
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ success: false, message: "Failed to update settings" });
    }
};

export { getSettings, updateSettings, upload };