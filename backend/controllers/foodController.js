import foodModel from '../models/foodModel.js';
import fs from "fs";

// ad food item

const addFood = async (req,res)=> {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        use: req.body.use,
        specialty: req.body.specialty,
        pack: req.body.pack,
        model_detail: req.body.model_detail,
        code: req.body.code,
        dimension: req.body.dimension,
        turelt: req.body.turelt,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message : 'food saved successfully'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: 'food saved error'})
    }

}

// all food list

const listFood = async (req, res) => {

    try {
        const foods = await foodModel.find({});
        res.json({success: true, data:foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'food list error'});
    }
}

// remove food item

const removeFood = async (req, res)=> {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: 'food removed'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'food remove error'});
    }
}

export {addFood, listFood, removeFood}