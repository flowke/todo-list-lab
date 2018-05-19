import React from 'react';
import names from 'classnames';


export default class Item extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      inEdit: false,
      val: ''
    };

  }

  // 编辑时候的输入框 的值 的控制
  inputChange=(ev)=>{
    this.setState({
      val: ev.target.value
    })
  }

  // 某个 todo 编辑完成了
  itemEditDone=()=>{

    this.setState({
      inEdit: false
    });

    let {editTodoDone, todo} = this.props;

    let val = this.state.val.trim();

    if(val){
      editTodoDone(todo.id, this.state.val);
    }else{
      this.props.deleteTodo(todo.id)
    }


  }

  // 失去焦点后 保存变化
  onBlur=()=>{
    this.itemEditDone();
  }

  // 编辑完成某个 todo
  onKeyDown=(ev)=>{
    if(ev.keyCode === 13) {
      this.itemEditDone();
    }else if(ev.keyCode === 27){
      this.setState({
        inEdit: false,
        val: this.props.todo.value
      });
    }

  }

  // 开始编辑某个 todo
  onEdit=()=>{
    let {value} = this.props.todo;

    this.setState({
        inEdit: true,
        val: value
      }, ()=>this.refs.editInput.focus() );

  }


  render(){


    let {onEdit, onBlur, inputChange} = this;

    let {todo, deleteTodo, toggleTodo} = this.props;

    let {inEdit, val} = this.state;
    // let itemClassName = todo.hasCompleted ? 'completed' : '';
    //
    // if(inEdit) itemClassName += 'editing';

    return (
      <li
        className={names({
          completed: todo.hasCompleted,
          editing: inEdit
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.hasCompleted}
            onChange={ev=> toggleTodo(todo.id)}
          />
          <label
            onDoubleClick = {onEdit}
            ref="label"
          >
            {todo.value}
          </label>
          <button
            className="destroy"
            onClick={ ev => deleteTodo(todo.id) }
            ref="btn"
          ></button>
        </div>
        <input
          type="text"
          className="edit"
          value={val}
          onBlur={onBlur}
          onKeyDown={this.onKeyDown}
          onChange={inputChange}
          ref="editInput"
        />
      </li>
    );
  }
}
