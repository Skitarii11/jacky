import settingModel from "../models/settingModel.js"

const getSettings = async (req, res) => {
    try {
        let settings = await settingModel.findOne({}); // Assuming only one settings document
        if (!settings) {
            // If no settings exist, create a default one
            settings = new settingModel({ logoUrl: '/images/default-logo.png' });
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
        const { logoUrl } = req.body;
        const settings = await settingModel.findOneAndUpdate(
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

export { getSettings, updateSettings };