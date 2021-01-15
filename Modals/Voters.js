const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const {ObjectId} =mongoose.Schema;

const VotersSchema=new Schema({

    electionId:{
        type: ObjectId,
        ref: "Election"
},   
    ElectionName:{
        type:String,
        required:false
    },
        voters:[
            {
                email:{
                    type: String,
                    required: true
                },

                password:{
                    type: String,
                    required: true
                },

              
            }
        ]
})

module.exports=mongoose.model("Voters", VotersSchema);