import Setting from "../models/settingModel.js"; // Import Sequelize model
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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

const uploadsDir = path.resolve('uploads');

const getSettings = async (req, res) => {
    try {
        // findOrCreate ensures a setting document always exists
        const [settings, created] = await Setting.findOrCreate({
            where: {}, // Find any (should only be one)
            defaults: { logoUrl: '/images/default-logo.png' } // Default values if created
        });
         if (created) {
            console.log("Default settings created.");
         }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.error("Error getting settings:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve settings" });
    }
};

const updateSettings = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const logoFilename = req.file.filename;
    const newLogoUrl = `/uploads/${logoFilename}`;

    try {
        // Find the existing setting first to get the old logo URL
        const [settings, created] = await Setting.findOrCreate({
             where: {},
             defaults: { logoUrl: '/images/default-logo.png' }
        });

        const oldLogoUrl = settings.logoUrl; // Get the current logo URL

        // Update the setting in the database
        settings.logoUrl = newLogoUrl;
        await settings.save(); // Save the changes to the instance

        // Delete the old logo file if it's not the default and exists
        if (oldLogoUrl && oldLogoUrl !== '/images/default-logo.png' && oldLogoUrl !== newLogoUrl) {
            const oldLogoPath = path.join(uploadsDir, path.basename(oldLogoUrl)); // Extract filename
            fs.unlink(oldLogoPath, (err) => {
                 if (err && err.code !== 'ENOENT') { // Ignore if file doesn't exist
                     console.error("Error deleting old logo file:", err);
                 }
            });
        }

        res.status(200).json({ success: true, message: "Settings updated successfully", data: settings });

    } catch (error) {
        console.error("Error updating settings:", error);
        // If DB update fails, delete the newly uploaded file
         fs.unlink(path.join(uploadsDir, logoFilename), (err) => {
            if (err) console.error("Error deleting newly uploaded file after DB error:", err);
        });
        res.status(500).json({ success: false, message: "Failed to update settings" });
    }
};

export { getSettings, updateSettings, upload };