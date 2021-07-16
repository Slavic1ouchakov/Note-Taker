const express = require('express');
const path = require('path');
const fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3000;
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use("/assets", express.static("./public/assets"));


//Connecting routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));