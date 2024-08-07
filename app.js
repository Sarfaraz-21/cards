const express =  require("express");
const app = express();
const path =  require ("path");
const userModel = require("./models/user");
const { error } = require("console");
let port = 3000;

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/read", async(req,res)=>{
    let users = await userModel.find();
    res.render("read",{users});
});

app.get("/edit/:userid", async(req,res)=>{
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit",{user});
});

app.post("/Update/:userid", async(req,res)=>{
    let{name,email,image} = req.body;

    let user = await userModel.findOneAndUpdate({_id: req.params.userid},{name,email,image},{new:true});
    res.redirect("/read");
});

app.get("/Delete/:id", async(req,res)=>{
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/create",async(req,res)=>{
    let {name, email, image} = req.body;

    let createdUSer = await userModel.create({
        name,
        email,
        image
    });

    res.redirect("/read");
});

app.listen(port, ()=>{
    console.log(`App is listening on port:${port}`);
});

// just a comment for testing