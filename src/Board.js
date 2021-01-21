import React from 'react'
import './App.css';
import Note from './components/Note/Note'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: this.getNotes()
    }
  }

  nextId = () => {
    this.uniqueId = this.uniqueId || 1
    return this.uniqueId++
  }

  getNotes = () => {
    var notes = []
    for (var index of Object.keys(localStorage)) {
      notes.push({ id: index, note: localStorage[index] })
    }
    console.log(notes)
    return notes
  }

  add = (text) => {
    var id = this.nextId()
    if (!text) {
      text = "*no content*"
    }
    var notes = [
      ...this.state.notes,
      {
        id: id,
        note: text
      }
    ]
    localStorage.setItem(id, text)

    this.getNotes()

    this.setState({ notes })
    this.refs.newNoteText.value = ""
    this.refs.newNoteText.focus()
  }

  update = (newText, id) => {
    var notes = this.state.notes.map(
      note => (note.id !== id) ?
        note :
        {
          ...note,
          note: newText
        }
    )
    this.setState({ notes })
  }

  remove = (id) => {
    var notes = this.state.notes.filter(note => note.id !== id)
    this.setState({ notes })
  }

  eachNote = (note) => {
    return (<Note key={note.id}
      id={note.id}
      onChange={this.update}
      onRemove={this.remove}>{note.note}</Note>)
  }


  render() {
    return (
      <div className="board">
        {/*
                        {this.state.notes.map((note, i) => {
                            return <Note text={note} key={i} />
                        })}
                        */}
        {this.state.notes.map(
          this.eachNote
        )}
        <div className="addNew newNote">
          <textarea ref="newNoteText" placeholder="write a note" className="inputTextNote"></textarea>
          <button onClick={() => this.add(this.refs.newNoteText.value)} className="buttonv2">Create</button>
        </div>
      </div>
    )
  }
}

export default Board;
