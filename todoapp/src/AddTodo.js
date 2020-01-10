import React, { Component } from 'react';

class AddTodo extends Component {
  state = {
    message: '',
    priority: ''
  }

  handleChange = (event,id) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state);
    this.setState({
      message: '',
      priority: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add task</label>
          <input type="text" id="message" onChange={this.handleChange} value={this.state.message}/>
          <label>Priority</label>
          <input type="text" id="priority" onChange={this.handleChange} value={this.state.priority}/>
          <button onSubmit={this.handleSubmit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;