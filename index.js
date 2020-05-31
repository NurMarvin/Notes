const { React } = require('powercord/webpack')
const { Plugin } = require('powercord/entities')
const { open: openModal } = require('powercord/modal')
const fs = require('fs')

const NoteModal = require('./components/NoteModal')

var notesFile = __dirname + '/notes.txt'

module.exports = class Notes extends Plugin {
  async startPlugin() {
    powercord.api.commands.registerCommand({
      command: 'notes',
      aliases: [],
      description: 'Opens your notes',
      usage: '{c}',
      executor: args => this.openNoteModal()
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('notes');
  }

  saveNotes(notes) {
    fs.writeFile(notesFile, notes, function (err) {
      if (err) {
        return err;
      }
    });
  }

  openNoteModal() {
    const saveNotes = notes => {
      this.saveNotes(notes)
    }

    fs.readFile(notesFile, function read(err, data) {
      if (err) {
        if (err.toString().includes('no such file or directory')) {
          saveNotes('');
          err = undefined;
        } else {
          console.error(err);
        }
      }

      openModal(() =>
        React.createElement(NoteModal, {
          save: saveNotes,
          notes: data,
          error: err
            ? 'An error occured while reading the notes file. Please look in the console for further information.'
            : ''
        })
      );
    });
  }
}
