const express=require("express");
const bodyParser=require("body-parser");
const connectDB = require('./config/database');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const app=express();
const path=require("path");
connectDB();


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/cricketBiddingData'})
 // Set to true if using HTTPS
  }));
app.get('/',(req,res)=>{
    res.render('publicDomain');
});
app.use('/admin', adminRoutes);
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
