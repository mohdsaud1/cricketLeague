const express= require("express");
const app=express();
const Port = process.env.Port || 3000;
 const bodyParser = require('body-parser');
const path = require('path');
const bcrypt=require('bcrypt');
const collection=require('./config');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true }));

// use ejs as view engine
app.set('view engine','ejs');


app.use(express.static('public'));


app.get('/', (req,res) => {
    res.render('index');
});

app.get('/login', (req,res) => {
    res.render('login');
});


// Login Route
app.post('/login', async (req, res) => {
    // const { username, password } = req.body;

    try {
        const check = await collection.findOne({ name: req.body.username});

        if (!check) {
            return res.status(400).send('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(req.body.password, check.password);

        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        res.send('Login successful');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.listen(Port,()=>{
    console.log("Running..");
})