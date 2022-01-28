const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formCreationSchema = new Schema({
    imagetitle: {
        type: String, 
        required: true
    },
    imagedescription: {
        type: String, 
        required: true
    },
    attachementName : {
        type: String, 
        required: true
    },
    attachementOrginalName : {
        type: String, 
        required: true
    },
    thumbnailAttachementName : {
        type: String, 
    },
    previewAttachementName : {
        type: String, 
    },
    category: {
        type: String, 
        required: true,
        enum:['People','Tech','Entertainment']
    },
    itemForSale: {
        type: String,
        required: true,
        enum:[true,false]
    },
    amount: {type: Number},
    termAndCond: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const FormCreation = mongoose.model('FormCreation', formCreationSchema);

module.exports = FormCreation;