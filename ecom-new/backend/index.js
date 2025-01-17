const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// databse connection with mongoose

mongoose.connect("mongodb+srv://user123:user143@cluster0.c8rw9qi.mongodb.net/ECOM-NEW-ecommerce?retryWrites=true&w=majority&appName=Cluster0")

//api creation
app.get('/',(req,res)=>{
    res.send("express app is running");
})



//image storage endpoint
 const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })

 const upload = multer({storage:storage});

 //creating upload endpoint for images
app.use('/images', express.static('upload/images'))

 app.post("/upload",upload.single('product'),(req,res)=>{
      res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
      })
 }) 

 //schema for creating products
 const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
 })

 app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
 })

 //creating api endpoint for deleting products
 app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name,
    })
 })

 //creating api for getting all products
 app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all products fetched")
    res.send(products);
 })

 //schema creation for user log in
 const User = mongoose.model('User',{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    },
 });

 //cerating endpoint for registration the user
 app.post("/signup",async (req, res)=>{
    let check = await User.findOne({ email: req.body.email});
    if (check) {
        return res.status(400).json({
            success:false,
            errors: "Existing user found with same email",
        });
    }
    let cart ={};
    for(let i=0; i<300; i++){
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data = {
        user: {
            id: user.id,
        },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token})
 })

 //cerating endpoint for user login
 app.post('/login',async (req,res)=>{
    let user = await User.findOne({ email: req.body.email });
    if(user){
        const passMatch = req.body.password === user.password;
        if(passMatch) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token});
        }else{
            res.json({ success: false, errors: "wrong password"});
        }
    }
    else{
        res.json({ success: false, errors: "wrong email address"});
    }
 });

 //creating endpoint for latest products
 app.get('/newcollections', async (req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollections fetched")
    res.send(newcollection);
 });
//creating endpoint for popular products
app.get('/popularproducts', async (req, res)=>{
    let products = await Product.find({category: "men"});
    let popularproducts = products.slice(0,4);
    console.log("popular products fetched")
    res.send(popularproducts);
 });
 //creating endpoint for middleware to fetch user
 const fetchUser = async (req, res, next)=> {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({errors: "please authenticate using valid login"});
    }
    else{
        try{
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next()
        }catch (error){
            res.status(401).send({errors: "please authenticate using a valid token"})
        }
    }
 }
//creating endpoint for adding products to cartdata
app.post('/addtocart', fetchUser, async (req, res)=> {
    console.log("added", req.body.itemId);
   let userData = await User.findOne({_id:req.user.id});
   userData.cartData[req.body.itemId] += 1;
   await User.findOneAndUpdate({_id: req.user.id}, { cartData:userData.cartData });
   res.send("Added");
})

//creating endpoint for removing products to cartdata
app.post('/removefromcart', fetchUser, async (req, res)=> {
    console.log("removed", req.body.itemId)
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id: req.user.id}, { cartData:userData.cartData });
    res.send("removed");
 })
 //creating endpont to get cartdata
 app.post("/getcart", fetchUser, async(req, res)=> {
    console.log("get cart");
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
 })
 app.listen(port,(error)=>{
    if(!error){
        console.log("server is running on port "+port);
    }
    else{
        console.log("error : "+error);
    }
})