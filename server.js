const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Read existing notes from the JSON file
const notesFilePath = path.join(__dirname, 'db.json');

// Function to read notes from the JSON file
const readNotesFromFile = () => {
    try {
        const data = fs.readFileSync(notesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Function to write notes to the JSON file
const writeNotesToFile = (notes) => {
    fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// GET route to retrieve all notes
app.get('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
});

// POST route to add a new note
app.post('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    writeNotesToFile(notes);
    res.json(newNote);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Note Taker application');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
