import Food from '../models/foodModel.js'; // Import Sequelize model
import fs from "fs";
import path from 'path'; // Use path for robust uploads path construction

const uploadsDir = path.resolve('uploads'); // Define uploads directory path

const addFood = async (req, res) => {
    if (!req.file) {
         return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }
    const image_filename = req.file.filename;

    try {
        const newFood = await Food.create({ // Use Sequelize's create method
            name: req.body.name,
            description: req.body.description,
            price: priceAsNumber,
            category: req.body.category,
            use_field: req.body.use, // map to DB field name
            specialty: req.body.specialty,
            pack: req.body.pack,
            model_detail: req.body.model_detail,
            code: req.body.code,
            dimension: req.body.dimension,
            turelt: req.body.turelt,
            asaalt: req.body.asaalt,
            guidel: req.body.guidel,
            hurd: req.body.hurd,
            chadal: req.body.chadal,
            motor75: req.body.motor75,
            motor100: req.body.motor100,
            image: image_filename
        });
        res.json({ success: true, message: 'Food saved successfully', data: newFood }); // Optionally return created food
    } catch (error) {
        console.log("Error saving food:", error);
        // If error saving DB entry, delete uploaded file
        fs.unlink(path.join(uploadsDir, image_filename), (err) => {
            if (err) console.error("Error deleting uploaded file after DB error:", err);
        });
        res.status(500).json({ success: false, message: 'Error saving food' }); // Use 500 status code
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await Food.findAll({}); // Use Sequelize's findAll
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("Error listing food:", error);
        res.status(500).json({ success: false, message: 'Error listing food' }); // Use 500 status code
    }
}

const removeFood = async (req, res) => {
    const foodId = req.body.id;
    if (!foodId) {
        return res.status(400).json({ success: false, message: 'Food ID required' });
    }

    try {
        const food = await Food.findByPk(foodId); // Use Sequelize's findByPk (Primary Key)
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        const imagePath = path.join(uploadsDir, food.image);

        // Delete from database first
        await food.destroy(); // Use Sequelize's destroy instance method

        // Then delete file (only if DB deletion was successful)
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image file, but food removed from DB:", err);
                // Don't send error response here, DB part succeeded. Log it.
            }
        });

        res.json({ success: true, message: 'Food removed successfully' });
    } catch (error) {
        console.log("Error removing food:", error);
        res.status(500).json({ success: false, message: 'Error removing food' }); // Use 500 status code
    }
}

export { addFood, listFood, removeFood };