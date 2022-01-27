const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    otp:{
        type: String,
        default:null
    },
    status:{
        type: String,
        enum:['Active','Inactive'],
        default:'Inactive'
    },
    otpstatus:{
        type:String,
        enum:['Verified','Pending'],
        default:'Pending'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;