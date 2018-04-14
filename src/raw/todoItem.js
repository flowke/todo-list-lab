import React, {Component} from 'react';

export default class Todo extends Component{
  constructor(props){
      super(props);
  }

  render(){

    return (
       <li
         // className="completed"
         // className="editing"
       >
         <div className="view">
           {/* 勾选按钮 */}
           <input
             type="checkbox"
             className="toggle"
           />
           {/* todo 的内容 */}
           <label ref="label">
             我是 todo 内容
           </label>
           {/* 删除按钮 */}
           <button
             className="destroy"
             ref="btn"
           ></button>
         </div>
         {/* 编辑 todo 的输入框 */}
         <input
           type="text"
           className="edit"
           ref="editInput"
         />
       </li>
    )
  }
}
