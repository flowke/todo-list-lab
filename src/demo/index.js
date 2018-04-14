import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Todo from './todoItem';
import Footer from './footer';




class TodoList extends Component{
  constructor(props){
      super(props);

      this.state = {
        inputVal: '',
        todos: []
      }

  }

  handleInputChange=(ev)=>{
    this.setState({
      inputVal: ev.target.value
    })
  }

  handleInputKeyDown=(ev)=>{
    let {todos} = this.state;
    let {value,} = ev.target;

    value = value.trim();

    if(ev.keyCode === 13 && value !==''){
      this.setState({
        inputVal: '',
        todos: [
          {
            id: Math.random(),
            content: value,
            hasCompoleted: false
          },
          ...todos
        ]
      })
    }
  }

  toggleTodoStatus=(id)=>{

    let {todos} = this.state;

    this.setState({
      todos: todos.map(todo=>{
        if(todo.id===id){
          todo.hasCompoleted = !todo.hasCompoleted
        };
        return {...todo};
      })
    })
  }

  deleteOneTodo=(id)=>{
    let {todos} = this.state;

    this.setState({
      todos: todos.filter(todo=>todo.id !== id)
    });
  }

  render(){

    let {
      todos,
      inputVal
    } = this.state;

    let todosComp = todos.map(todo=>{
      return (
        <Todo
          key={todo.id}
          {...todo}
          {...{
            toggleTodoStatus: this.toggleTodoStatus,
            deleteOneTodo: this.deleteOneTodo
          }}
        />
      )
    });

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            type="text"
            className="new-todo"
            placeholder="type something here"
            value={inputVal}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
        </header>

        {todos.length>0 && (
          <section className="main">
            {/* 全选按钮 */}
            <input
              type="checkbox"
              className="toggle-all"

            />
            <ul className="todo-list">
              {todosComp}
            </ul>
          </section>
        )}

        {todos.length>0 && (
          <Footer/>
        )}

      </div>
    )
  }
}

ReactDOM.render(
  <TodoList/>
  ,
  document.getElementById('root')
);
