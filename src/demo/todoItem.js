import React, {Component} from 'react';

export default class Todo extends Component{
  constructor(props){
      super(props);

      this.state = {
        isInEdit: false,
        editVal: ''
      }
  }

  onEdit=()=>{
    this.setState({
      isInEdit: true,
      editVal: this.props.content
    },()=>{
      this.editInputRef.focus();
    })
  }

  editInput=(e)=>{
    this.setState({
      editVal: e.target.value
    });
  }



  onSave=()=>{
      let {changeTodoContent, id, deleteOneTodo} = this.props;

    if(this.state.editVal.trim()===''){
      deleteOneTodo(id);
    }else{
      changeTodoContent(id, this.state.editVal);

      this.setState({
        isInEdit: false,
      });
    }


  }

  onEditInputKeyDown=(e)=>{

    console.log('onKeyDown');

    if(e.keyCode===13){
      this.onSave();
    }

    if(e.keyCode===27){
      this.setState({
        isInEdit: false,
        editVal: this.props.content
      });
    }

  }

  render(){

    let {
      id,
      content,
      hasCompoleted,
      toggleTodoStatus,
      deleteOneTodo
    } = this.props;

    let {
      isInEdit,
      editVal
    } = this.state;

    let classnames = hasCompoleted ? 'completed': '';

    classnames = isInEdit ? classnames + ' editing' : classnames;

    return (
       <li
         className={classnames}
         // className="editing"
       >
         <div className="view">
           {/* 勾选按钮 */}
           <input
             type="checkbox"
             className="toggle"
             checked={hasCompoleted}
             onChange={()=>toggleTodoStatus(id)}
           />
           {/* todo 的内容 */}
           <label
             ref="label"
             onDoubleClick={this.onEdit}
           >
             {content}
           </label>
           {/* 删除按钮 */}
           <button
             className="destroy"
             ref="btn"
             onClick={()=>deleteOneTodo(id)}
           ></button>
         </div>
         {/* 编辑 todo 的输入框 */}
         <input
           type="text"
           className="edit"
           ref={elt=>this.editInputRef = elt}
           value={editVal}
           onChange={this.editInput}
           onKeyDown={this.onEditInputKeyDown}
           onBlur={this.onSave}
         />
       </li>
    )
  }
}
