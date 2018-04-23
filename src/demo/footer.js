import React, {Component} from 'react';

// 函数式组件
//  一个函数函数就是一个组件, return 结构
//  特点:
//    没有内部状态: state
//    没有生命周期函数
//    没有组件的实例
//  优点:
//    轻量
//  使用:
//    如果你的组件没有涉及到内部状态, 只是用来渲染数据, 那么就用函数式组件

function Comp() {
  return (
    <div>我是组件</div>
  )
}

export default function(props){
  let {
      leftItem,
      isShowClearButton,
      clearHasCompleted,
      view,
      changeView
    } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong> {leftItem} </strong>
        <span>item left</span>
      </span>
      <ul className="filters">
        <li
          onClick={()=>changeView('all')}
        >
          <a
            className={view==='all'? 'selected' : ''}
          >All</a>

        </li>
        <li
          onClick={()=>changeView('active')}
        >
          <a
            className={view==='active'? 'selected' : ''}
          >Active</a>

        </li>
        <li
          onClick={()=>changeView('completed')}
        >
          <a
            className={view==='completed'? 'selected' : ''}
          >Completed</a>

        </li>
      </ul>
      {/* 清除完成按钮 */}
      {
        isShowClearButton && (
          <button
            className="clear-completed"
            onClick={clearHasCompleted}
          >
            clear all completed
          </button>
        )
      }

    </footer>
  )

}
