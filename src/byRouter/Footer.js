import React from 'react';
import {Link} from 'react-router-dom';
import names from 'classnames';

export default function Footer(props){

  let {
    leftCount,
    showClearBtton,
    onClearCompletedTodo,
    pathname
  } = props;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftCount} </strong>
          <span>item left</span>
        </span>
        <ul className="filters">
          <li>
            <Link
              to="/"
              className={names({selected: pathname==='/'})}
            >All</Link>

          </li>
          <li>
            <Link
              to="/active"
              className={names({selected: pathname==='/active'})}
            >Active</Link>

          </li>
          <li>
            <Link
              to="/completed"
              className={names({selected: pathname==='/completed'})}
            >Completed</Link>

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
