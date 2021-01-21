import React from 'react'
// import './App.css';
import ReactDraggable from 'react-draggable'

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    edit = () => {
        // alert('Editing')
        this.setState({ editing: true })
    }

    save = () => {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({ editing: false })
    }

    changeNoteBG = (id) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.refs.newbgcolor.value);
        result = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };

        // console.log(this.state.bgcolor);
        console.log(result);
        this.setState({ bgcolor: `${result.r},${result.g},${result.b}` })
    }

    delete = (id) => {
        this.props.onRemove(this.props.id)
    }

    renderForm = () => {
        return (
            <div className="note inputNote" style={{ background: 'rgb(' + this.state.bgcolor + ', 0.4)' }}>
                {/* <textarea onChange={(e)=>{this.text = e.target.value}}></textarea> -> my way of doing it*/}
                {/* Actual easier(?) way of doing it*/}
                <textarea ref="newText" className="inputTextNote" ></textarea>
                <button onClick={this.save} className="buttonv2">Save</button>
            </div>
        )
    }

    renderDisplay = () => {
        return (
            <div className="note displayNote" style={{ background: 'rgb(' + this.state.bgcolor + ')' }}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} className="button">edit</button>
                    <button onClick={this.delete} className="button">X</button>
                    <input onChange={this.changeNoteBG} ref="newbgcolor" type="color" className="note-bgcolor" />
                </span>
            </div>
        )
    }

    render() {
        return (
            <ReactDraggable>
                {
                    (this.state.editing) ? this.renderForm() : this.renderDisplay()
                }
            </ReactDraggable>
        )
    }
}


export default Note;