const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/api/notes', async (req, res) => {
    console.log("Reading db.json file....");

    fs.readFile(`./db/db.json`, (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        console.log("Parsed Data: " + notes);

        res.json(notes);
        return;
    });

 });
app.post('/api/notes', (req, res) => {
    res.send('OK');
    const data = JSON.stringify([req.body]);
    fs.writeFile('./db/db.json', data, (err) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        console.log("Parsed Data: " + notes);
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));