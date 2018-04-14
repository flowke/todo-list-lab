import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Todo from './todoItem';
import Footer from './footer';




class TodoList extends Component{
  constructor(props){
      super(props);


  }
  render(){

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            type="text"
            className="new-todo"
            placeholder="type something here"
          />
        </header>

        <section className="main">
          {/* 全选按钮 */}
          <input
            type="checkbox"
            className="toggle-all"

          />
          <ul className="todo-list">
            <Todo/>
          </ul>
        </section>

        <Footer/>

      </div>
    )
  }
}

ReactDOM.render(
  <TodoList/>
  ,
  document.getElementById('root')
);
