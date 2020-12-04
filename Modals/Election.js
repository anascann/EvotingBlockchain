const { trim } = require('lodash');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ElectionSchema=new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    totalvoters:{
        type: Number,
        required: true
    },

    hostedby:{
        type:String ,
        required: true,
        
    }
})

module.exports=Election=mongoose.model('Election', ElectionSchema);