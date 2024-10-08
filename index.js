import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const title = [];
const content = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title : title,
        content : content
    });
});

app.post("/submit", (req, res) => {
    title.push(req.body["title"]);
    content.push(req.body["content"]);
    // console.log(title, content);
    res.render("index.ejs", {
        title : title,
        content : content
    });
});

app.post("/editPost", (req, res) => {
    title[req.body["index"]] = req.body["title"];
    content[req.body["index"]] = req.body["content"];
    res.render("index.ejs", {
        title : title,
        content : content
    });
})

app.post("/edit", (req,res) => {
    let index = req.body["index"];
    // console.log(index);
    res.render("index.ejs", {
        title : title,
        content : content,
        index : index
    });
});

app.post("/delete", (req, res) => {
    let index = req.body["index"];
    // console.log(index);
    title.splice(index, 1);
    content.splice(index, 1);
    res.render("index.ejs", {
        title : title,
        content : content
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});