const express = require('express');
const path = require('path');
const fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3005;
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use("/assets", express.static("./public/assets"));


//Connecting routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//GET request
app.get("/api/notes", (req, res) => {
    res.json(data)
});

app.get("/api/notes/:id", (req, res) => {
    res.json(data[Number(req.params.id)]);
});


// POST request
app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    let uniqueId = (data.length).toString();
    newNote.id = uniqueId;
    data.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) => {
        if (err) throw (err);
    });

    res.json(data);
})
//Delete capability 
app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;

    let newId = 0;
    console.log(`Deleting note with ${noteId}`);
    data = data.filter(currentNote => {
        return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
})

// Starts the server 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))