import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//set reviews as 
let reviews = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs'); 

app.get("/", (req, res)=>{
    res.render("index.ejs", {reviews: reviews});
});

app.post("/contact", (req, res)=>{
    const name = req.body.inputName;
    const email = req.body.inputEmail;
    const message = req.body.inputMessage;
   
    reviews.push({ name: name, email: email, message: message });

    res.redirect("/");
})

// app.update()
app.post("/edit/:index", (req, res)=>{
    const index = req.params.index;
    const {name, email, message} = req.body;
  
    if (reviews[index]){
        reviews[index] = {name, email, message}
    }
    res.redirect("/")

})
app.post('/delete/:index', (req, res)=>{
    const index = req.params.index;
    if (reviews[index]){
        reviews.splice(index, 1);
    }
    console.log(index);

    res.redirect("/")
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});