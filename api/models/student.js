const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    degree: { type: String, required: true },
    city: { type: String, required: true },
    admDate: { type: Date, required: true },
    rollNo: { 
        type: String, 
        required: true, 
        unique: true, 
    }
});

module.exports = mongoose.model('Student', studentSchema);