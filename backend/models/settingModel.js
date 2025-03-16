import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    logoUrl: {
        type: String,
        default: '/images/default-logo.png'  // Or a placeholder image path
    }
});

const settingModel = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
export default settingModel;