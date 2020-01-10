import React, {Component} from 'react';

import Todos from './todos';
import AddTodo from './AddTodo';

class App extends Component {
  state = {
    todos: [
      { id: 1, message: " to learn react-lifecycle methods", priority: "high" },
      { id: 2, message: " to learn materialize", priority: "low" }
    ]
  }
  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter(todo => {
      return todo.id !== id;
    })
    this.setState({
      todos: updatedTodos
    })
  }

  getId () {
    const last = this.state.todos.length;
    const lastId = last ? this.state.todos[last-1].id + 1 : 1 ;
    return lastId;
  }

  addTodo = (todo) => {
    todo.id = this.getId();
    const updatedTodo = [...this.state.todos, todo];
    this.setState({
      todos: updatedTodo
    })
  }
  render() {
    return (
      <div className="todo-App container "> 
        <h2 className="blue-text center">ToDo List</h2>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;