import React from 'react';
import names from 'classnames';
import {
  NavLink
} from 'react-router-dom';

export default function Footer(props){

  let {
    leftCount,
    showClearBtton,
    deleteCompleted
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftCount} </strong>
        <span>item left</span>
      </span>
      <ul className="filters">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="selected"
          >All</NavLink>

        </li>
        <li>
          <NavLink
            to="/active"
            activeClassName="selected"
          >Active</NavLink>

        </li>
        <li>
          <NavLink
            to="/completed"
            activeClassName="selected"
          >Completed</NavLink>

        </li>
      </ul>
      {
        showClearBtton && (
          <button
            className="clear-completed"
            onClick = {deleteCompleted}
            >
              clear all completed
            </button>
          )
        }
      </footer>
    );
}
