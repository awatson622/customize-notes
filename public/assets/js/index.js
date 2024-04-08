// Variable Declarations
let noteForm = document.querySelector('.note-form');
let noteTitle = document.querySelector('.note-title');
let noteText = document.querySelector('.note-textarea');
let newNoteBtn = document.querySelector('.new-note');
let clearBtn = document.querySelector('.clear-btn');

// Event Listeners
if (window.location.pathname === '/notes') {
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', clearForm);
}

const handleNoteSave = () => {
  // Construct a new note object with title and text from input fields
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };

  // Function to Clear the Note Form
function clearForm() {
  noteTitle.value = '';
  noteText.value = '';
}

  // Send a POST request to save the new note
  saveNote(newNote)
    .then(response => {
      if (response.ok) {
        // If the response is successful, reload notes and render the active note
        getAndRenderNotes(); // Reload notes
        renderActiveNote(); // Render the active note
      } else {
        // If the response is not successful, handle the error
        console.error('Failed to save note:', response.statusText);
      }
    })
    .catch(error => {
      // If an error occurs during the request, handle it
      console.error('Error saving note:', error.message);
      // Handle error (e.g., display error message)
    });
};


const handleNewNoteView = (e) => {
  // New note view logic here
};

const handleNoteDelete = (e) => {
  // Delete note logic here
};

const handleNoteView = (e) => {
  // View note logic here
};

const handleRenderBtns = () => {
  // Render buttons logic here
};

const renderNoteList = async (notes) => {
  // Render note list logic here
};

// API Routes
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Invocation
if (window.location.pathname === '/notes') {
  getAndRenderNotes();
}
