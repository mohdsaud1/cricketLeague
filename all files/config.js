const { name } = require('ejs');
const mongoose= require('mongoose');
const connect= mongoose.connect('mongodb://localhost:27017/Manager_auth');

//check database connected or not
connect.then(()=>{
    console.log('Database connected successfully');
})
.catch(()=>{
    console.log('Database cannot be connected');
});

//create Schema
const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// collection part

const collection = new mongoose.model('Manager_auth',loginSchema);

module.exports= collection;