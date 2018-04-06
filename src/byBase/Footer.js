import React from 'react';
import names from 'classnames';

export default function Footer(props){

  let {
    leftCount,
    showClearBtton,
    onClearCompletedTodo,
    view,
    changeView
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftCount} </strong>
        <span>item left</span>
      </span>
      <ul className="filters">
        <li>
          <a
            onClick={e=>changeView('all')}
            className={names({selected: view==='all'})}
          >All</a>

        </li>
        <li>
          <a
            className={names({selected: view==='active'})}
            onClick={e=>changeView('active')}
          >Active</a>

        </li>
        <li>
          <a
            className={names({selected: view==='completed'})}
            onClick={e=>changeView('completed')}
          >Completed</a>

          </li>
        </ul>
        {
          showClearBtton && (
            <button
              className="clear-completed"
              onClick = {onClearCompletedTodo}
            >
              clear all completed
            </button>
          )
        }
      </footer>
    );
}
