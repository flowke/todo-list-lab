import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer(props){

    let {
        leftCount,
        showClearBtton,
        onClearCompleted,
        pathname
    } = props;

    let clearBtn = null;

    if(showClearBtton){
        clearBtn = (
            <button
                className="clear-completed"
                onClick = {onClearCompleted}
            >

                clear all completed
            </button>
        );
    }

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
                        className={pathname==='/'? 'selected' : ''}
                    >All</Link>

                </li>
                <li>
                    <Link
                        to="/active"
                        className={pathname==='/active'? 'selected' : ''}
                    >Active</Link>

                </li>
                <li>
                    <Link
                        to="/completed"
                        className={pathname==='/completed'? 'selected' : ''}
                    >Completed</Link>

                </li>
            </ul>
            {clearBtn}
        </footer>
    );
}
