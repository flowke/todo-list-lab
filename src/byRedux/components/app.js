import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import Footer from './Footer';
import {actions} from './appRedux';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }

  }

  // 编辑 todo 完成
  editTodoDone=(id, value)=>{

    let {todosData} = this.state;

    todosData = todosData.map(elt=>{
      if(id === elt.id){
        elt.value = value;
      }
      return {...elt};
    });

  }
  // 输入框输入值的受控
  inputChange=(ev)=>{
    this.props.inputChange(ev.target.value);

  }

  // 添加一条 todo
  onKeyDownPost=(ev)=>{

    if(ev.keyCode !== 13) return;

    let value = this.props.inputVal;

    this.props.addTodo(value);

  }

  // 统一切换所有tosdo的完成状态
  onToggleAll=(ev)=>{
    let {checked} = ev.target;

    this.props.toggleAll(checked);
  }


  render(){

    let {
      onKeyDownPost,
      onDestroy,
      onToggleAll,
      inputChange,
      onToggleTodoCompletedStatus,
    } = this;

    let {
      location,
      todosData,
      inputVal,
      toggleTodo,
      deleteTodo,
      editTodoDone,
    } = this.props;
    let items = null,
    footer = null,
    itemsBox = null;

    let leftCount = todosData.length;

    items = todosData.filter(elt=>{
      if(elt.hasCompleted) leftCount--;
      switch (location.pathname) {
        case '/active':
        return !elt.hasCompleted;
        case '/completed':
        return elt.hasCompleted
        default:
        return true;
      }
    });

    items = items.map((elt, i)=>{
      return (
        <Item
          {...{
            deleteTodo,
            todo: elt,
            toggleTodo,
            editTodoDone
          }}
          key={elt.id}
        />
      );
    });

    if(todosData.length){
      itemsBox = (
        <section className="main">
          <input
            type="checkbox"
            className="toggle-all"
            checked={leftCount===0}
            onChange={onToggleAll}
          />
          <ul className="todo-list">
            {items}
          </ul>
        </section>
      );
      footer = (
        <Footer
          {...{
            leftCount,
            showClearBtton: leftCount < todosData.length,
          }}
        />
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            type="text"
            className="new-todo"
            value={inputVal}
            onChange={inputChange}
            onKeyDown= {onKeyDownPost}
            placeholder="type something here"
          />
        </header>
        {itemsBox}
        {footer}
      </div>
    );
  }
}

export default connect(
  state=>state.todo,
  dispatch=>bindActionCreators(actions,dispatch)
)(App)
