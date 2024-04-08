document.addEventListener('DOMContentLoaded', () => {
    // Load existing notes when the page loads
    loadNotes();

    // Event listener for saving a note
    document.querySelector('.save-note').addEventListener('click', () => {
        console.log('Save Note button clicked');
        saveNote();
    });

    // Event listener for clearing the note form
    document.querySelector('.clear-btn').addEventListener('click', clearForm);
});


async function loadNotes() {
    console.log('Loading notes...');
    try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
            throw new Error('Failed to load notes');
        }
        const data = await response.json();
        updateNotesUI(data);
        console.log('Notes loaded successfully:', data);
    } catch (error) {
        console.error('Error loading notes:', error.message);
        // Handle error (e.g., display error message)
    }
}

async function saveNote() {
    console.log('Saving note...');
    const title = document.querySelector('.note-title').value;
    const text = document.querySelector('.note-textarea').value;

    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, text })
        });

        if (!response.ok) {
            throw new Error('Failed to save note');
        }

        // Reload notes after saving
        loadNotes();
        console.log('Note saved successfully.');
    } catch (error) {
        console.error('Error saving note:', error.message);
        // Handle error (e.g., display error message)
    }
}

function clearForm() {
    console.log('Clearing form...');
    document.querySelector('.note-title').value = '';
    document.querySelector('.note-textarea').value = '';
}

function updateNotesUI(notes) {
    // Clear existing notes
    const notesContainer = document.getElementById('list-group');
    notesContainer.innerHTML = '';

    // Display existing notes
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.textContent = `${note.title}: ${note.text}`;
        notesContainer.appendChild(noteElement);
    });
}
