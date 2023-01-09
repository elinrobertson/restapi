const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json())

app.get("/books", function(req,res){
    fs.readFile("books.json", function (err, data){
        if (err) {
            return res.status(404).json("Not found");
        }
    const books = JSON.parse(data)
    res.status(200).send(books)
    return;
    })
});

app.post("/books", function(req, res) {
    fs.readFile("books.json", (err, data) =>{
        if (err) {
            return res.status(404).json("Not found");
        }
        const books = JSON.parse(data)

        books.push(req.body);

        fs.writeFile("books.json", JSON.stringify(books, null, 2), function(err){
            if (err) {
                return res.status(404).json("Not found");
            }
        })
        res.status(201).json("New book added")
    })
})

app.delete("/books/:id", (req, res) => {
    fs.readFile("books.json", (err, data) => {
      if (err) {  
        return res.status(404).json("Not found");
      }
    let parsedData = JSON.parse(data);
    const book = parsedData.find((book) => book.id == req.params.id);
    const index = parsedData.findIndex((b) => b.id === book.id);
  
    parsedData.splice(index, 1);
  
    fs.writeFile("books.json", JSON.stringify(parsedData, null, 2),
    function (err) {
    if (err) {
        return res.status(404).json("Not found");
        }
    });
    res.status(200).json("Book with " + req.params.id + " removed");
    });
});

app.put("/books/:id", (req,res) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            return res.status(404).json("Not found");
        }

        let newData = JSON.parse(data);
        newData.find((book) => {
            if (book.id == req.params.id) {
                book.id = req.body.id;
                book.price = req.body.price; 
                book.author = req.body.author;
                book.title = req.body.title;
            } 
        })
        
         
    fs.writeFile("books.json",JSON.stringify(newData, null, 2),
        function (err) {
    if (err) {
        return res.status(404).json("Not found");
        }
    });
    res.status(200).json("Price updated on book with " + req.params.id);
    });
    
});


app.listen(3000, () => console.log("Server is up on http://localhost:3000"));