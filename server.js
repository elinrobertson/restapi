const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json())

app.get("/books", function(req,res){
    fs.readFile("books.json", function (err, data){
        if (err) {
            console.log(err);
        }
    const books = JSON.parse(data)
    res.status(200).send(books)
    return;
    })
});

app.post("/books", function(req, res, next) {
    fs.readFile("books.json", (err, data) =>{
        if (err) {
            console.log(err);
        }
        const books = JSON.parse(data)

        books.push(req.body);

        fs.writeFile("books.json", JSON.stringify(books, null, 2), function(err){
            if (err) {
                console.log(err);
            }
        })
        res.status(201).json(req.body)
    })
})

app.delete("books/:id", (req, res) => {

    fs.readFile("books.json", (err, data) => {
      if (err) {  
        res.status(404);
      }
    let parsedData = JSON.parse(data);
    const book = parsedData.find((book) => book.id === req.params.id);
    const index = parsedData.findIndex((b) => b.id === book.id);
  
    parsedData.splice(index, 1);
  
    fs.writeFile("books.json",JSON.stringify(parsedData, null, 2),
    function (err) {
    if (err) {
     console.log(err);
        }
    });
    res.status(200).json("Book removed");
    });
});




app.listen(3000, () => console.log("Server is up on http://localhost:3000"));