const express = require("express"); //remember basic
const app = express();
const path = require("path"); // to use in view and public
const{v4:uuidv4} = require("uuid"); // gives randomly unique value;
const port = 8080;
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({extended:true}));// app.use for every and setting up for post to parse
app.use(methodOverride('_method'));

app.set("view engine", "ejs"); // setting up views
app.set("views",path.join(__dirname,"views")); 

app.use(express.static(path.join(__dirname, "public"))); //setting up public

let posts = [
    {
        id : uuidv4(),
        username:"Sahil",
        content:"I hate coding :("
    },
    {
         id :uuidv4(),
        username:"apnaCollege",
        content:"we'll learn about RESTful APIs"
    },
    {
        id : uuidv4(),
        username: "qwerty",
        content: "I got an internship"
    }
];


app.get("/posts",(req,res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs"); // to add new we go the this form page and take the data and form will send post to /posts
});

app.post("/posts", (req,res) => { // send by form through method and action
    // console.log("req.body"); req.body bcz post request now add it to the array 
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username, content});
    //res.send("post request working"); // differnt pages so ?? now express has the way out - voilla redirect to connect paths and different pages
    res.redirect("/posts"); // redirect the respond
});

//now to see each individual post in detail with its id
app.get("/posts/:id", (req,res) =>{
    let {id} = req.params;
    //console.log(id);
    let post = posts.find((p) => id===p.id);
    //console.log(post);
    //res.send("request working");
    //now we will send it to another pg show.ejs
    res.render("show.ejs",{post});
});


//now to update info we use patch: and to edit override patch on post in edit.ejs
app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    //console.log(newContent);
    let post = posts.find((p) => id===p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch request working"); redirect
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) =>  id === p.id);
    res.render("edit.ejs", {post});
});
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});

// app.patch("/posts/:id",(req,res) => {
//     let {id} = req.params;// mow we want new content in the req body
//     let newContent = req.body.content;
//     //console.log(id);
//     console.log(newContent);
//     // so now upddate it by selecting the post
//     // let post = posts.find((p) => id===p.id);
//     // post.content = newContent;
//     // console.log(post);
//     res.send("patch request working");
// });
