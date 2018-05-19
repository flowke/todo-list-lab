
const initialState = {
  todosData: [],
  inputVal: ''
};

const INPUT_CHANGE = 'INPUT_CHANGE/todo-rdx/app';
const ADD_TODO = 'ADD_TODO/todo-rdx/app';
const DELETE_TODO = 'DELETE_TODO/todo-rdx/app';
const TOGGLE_ALL = 'TOGGLE_ALL/todo-rdx/app';
const TOGGLE_TODO = 'TOGGLE_TODO/todo-rdx/app';
const DELETE_COMPLETED = 'DELETE_COMPLETED/todo-rdx/app';
const EDIT_TODO_DONE = 'EDIT_TODO_DONE/todo-rdx/app';

const inputChange = (inputVal)=>({
  type: INPUT_CHANGE,
  inputVal
});

// 添加一个 todo
const addTodo = (content)=>(dispatch, getState)=>{
  if(content.trim()==='') return;

  let {todosData} = getState().todo;

  dispatch({
    type: ADD_TODO,
    todosData: [
      {
        id: Math.random(),
        value: content,
        hasCompleted: false

      },
      ...todosData
    ]
  });
}

// 删除 todo
const deleteTodo = (id)=>(dispatch, getState)=>{
  let {todosData} = getState().todo;
  dispatch({
    type: DELETE_TODO,
    todosData: todosData.filter(todo=>todo.id!==id)
  })
}
//
const toggleAll = (checked)=>(dispatch, getState)=>{

  let {todosData} = getState().todo;

  dispatch({
    type: TOGGLE_ALL,
    todosData: todosData.map(todo=>{
      todo.hasCompleted = checked;
      return {...todo}
    })
  })
}
const toggleTodo = (id)=>(dispatch, getState)=>{

  let {todosData} = getState().todo;
  dispatch({
    type: TOGGLE_TODO,
    todosData: todosData.map(todo=>{
      if(todo.id===id){
        todo.hasCompleted = !todo.hasCompleted;
      }
      return {...todo}
    })
  })
}
const deleteCompleted = ()=>(dispatch, getState)=>{

  let {todosData} = getState().todo;

  dispatch({
    type: DELETE_COMPLETED,
    todosData: todosData.filter(todo=>!todo.hasCompleted)
  })
}

const editTodoDone = (id,value)=>(dispatch, getState)=>{

  let {todosData} = getState().todo;

  dispatch({
    type: EDIT_TODO_DONE,
    todosData: todosData.map(todo=>{
      if(todo.id===id){
        todo.value = value;
      }
      return {...todo};
    })
  })
}



export default function todos(state=initialState, action) {

  let {
    type,
    inputVal,
    todosData
  } = action;

  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
        inputVal
      }
    case ADD_TODO:
      return {
        ...state,
        todosData: [...todosData],
        inputVal: ''
      }
    case DELETE_TODO:
    case TOGGLE_ALL:
    case TOGGLE_TODO:
    case DELETE_COMPLETED:
    case EDIT_TODO_DONE:
      return {
        ...state,
        todosData: [...todosData],
      }
    default:
      return state;
  }
}



export const actions = {
  inputChange,
  addTodo,
  deleteTodo,
  toggleAll,
  toggleTodo,
  deleteCompleted,
  editTodoDone
}
