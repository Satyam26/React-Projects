import React from 'react';

const Todos = ({todos, deleteTodo}) => {
  
  const isTodo = todos.length ? true: false;

  const todoList = isTodo ? (todos.map(todo => {
    return ( 
      
      <div className= "collection-item" key={todo.id} onClick= {() => deleteTodo(todo.id)}>
        <div className="row valign-wrapper">
          <div className="col s12 m9 l9">
          <h5><span>{todo.message}</span></h5>
          </div>
          <div className="col s12 m3 l3">
          <p className="red-text">{todo.priority}</p>
          </div>
        </div>
      </div>  
    )
    })) : (<p className="center">You are free to do anything</p> );
  return ( 
    <div className="todos collection">
      {todoList}
    </div>
  );
}

export default Todos;