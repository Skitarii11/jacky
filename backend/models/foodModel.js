import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name : {type:String, required:true},
    description: {type:String, required:true},
    price : {type:Number, required:true},
    category : {type:String, required:true},
    image : {type:String, required:true},
    use: {type:String, required:true},
    specialty: {type:String, required:true},
    model_detail: {type:String, required:true},
    code : {type:Number, required:true},
    dimension: {type:String, required:true},
    turelt: {type:String, required:true},
    pack: {type:String, required:true}
    
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;