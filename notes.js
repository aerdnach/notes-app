const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes();
    
    console.log(chalk.yellowBright.inverse("Note List:") + ' ' + chalk.redBright.inverse('['+ notes.length + ' notes]\n'));
    
    notes.forEach(note => {
        console.log(chalk.green.inverse('Title:') + ' ' + note.title + "\n" + chalk.blue.inverse("Body:") + ' ' + note.body + '\n------')
    });
}

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title === title);
    
    if(note !== undefined){
        console.log(chalk.green.inverse('Title:') + ' ' + note.title + "\n" + chalk.blue.inverse("Body:") + ' ' + note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'));
    }
    
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    list: listNotes,
    read: readNote
}