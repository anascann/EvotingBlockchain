const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const PersonSchema= new Schema({
    name:{
        type:String,
        required: true
    },

    age:{
        type: Number,
        required:false
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type: String,
        required: true
    },

    address:{
        type:String,
        required:false
    },
    city:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    }

  
});

module.exports=Person=mongoose.model('myPerson',PersonSchema);