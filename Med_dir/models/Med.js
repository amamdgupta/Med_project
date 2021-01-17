const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const medSchema=new Schema({
    title : {
        type : String,
        required : true
    },
    composition : {
        type : String,
        required : true
    },
    info : {
        type : String,
        required: true
    }
},{ timestamps :true});

const Med=mongoose.model('Meds',medSchema);

module.exports=Med;


