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
    asaalt: {type:String, required:true},
    guidel: {type:String, required:true},
    hurd: {type:String, required:true},
    chadal: {type:String, required:true},
    motor75: {type:String, required:true},
    motor100: {type:String, required:true},
    pack: {type:String, required:true}
    
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;