import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Todo from './todoItem';
import Footer from './footer';




class TodoList extends Component{
  constructor(props){
      super(props);

      this.state = {
        inputVal: '',
        todos: [],
        view: 'all'
      }

  }

  handleInputChange=(ev)=>{
    this.setState({
      inputVal: ev.target.value
    })
  }

  // 提交(保存)一个 todo,
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

  // 改变 todo 的完成与未完成的状态
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

  // 删除一个 todo
  deleteOneTodo=(id)=>{
    let {todos} = this.state;

    this.setState({
      todos: todos.filter(todo=>todo.id !== id)
    });
  }

  // 全选
  toggleAll=(event)=>{
    let {todos} = this.state;

    todos = todos.map(elt=>{
          elt.hasCompoleted = event.target.checked;
      return elt;
    });

    this.setState({
      todos
    });

  }

  // 改变当前视图
  changeView=(view)=>{
    this.setState({
      view
    })
  }

  // 清除已经完成的 todo
  clearHasCompleted=()=>{
    let {todos} = this.state;

    todos = todos.filter(elt=>!elt.hasCompoleted);

    this.setState({
      todos
    });

  }

  // 修改 todo 内容
  changeTodoContent=(id, content)=>{
    let {todos} = this.state;

    todos = todos.map(elt=>{
      if(elt.id===id){
        elt.content = content;
      };

      return elt;
    });

    this.setState({
      todos
    })
  }

  render(){

    let {
      todos,
      inputVal,
      view
    } = this.state;

    let leftItem = todos.length;

    let hasAllChecked = todos.every(todo=>todo.hasCompoleted);


    let currentShowTodos = todos.filter(todo=>{
      if(todo.hasCompoleted){
        leftItem--;
      };

      switch (view) {
        case 'active':
            return !todo.hasCompoleted;
          break;
        case 'completed':
            return todo.hasCompoleted;
          break;
        default:
            return true;
      }
    });

    let todosComp = currentShowTodos.map(todo=>{

      return (
        <Todo
          key={todo.id}
          {...todo}
          {...{
            toggleTodoStatus: this.toggleTodoStatus,
            deleteOneTodo: this.deleteOneTodo,
            changeTodoContent: this.changeTodoContent
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
              onChange={this.toggleAll}
              checked={hasAllChecked}
            />
            <ul className="todo-list">
              {todosComp}
            </ul>
          </section>
        )}

        {todos.length>0 && (
          <Footer
            {...{
              leftItem,
              isShowClearButton: todos.length > leftItem,
              clearHasCompleted: this.clearHasCompleted,
              view,
              changeView: this.changeView
            }}

          />
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
