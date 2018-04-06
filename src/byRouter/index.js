import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todosData: [],
      inputVal: '',
      view: 'all'
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

  // 改变显示不同状态的 todo
  changeView=(view)=>{
    this.setState({view});
  }

  // 输入框输入值的受控
  inputChange=(ev)=>{
    this.setState({
      inputVal: ev.target.value
    })
  }

  // 添加一条 todo
  onKeyDownPost=(ev)=>{

    if(ev.keyCode !== 13) return;

    let value = this.state.inputVal.trim();

    if(value===''){
      return;
    }

    let {todosData} = this.state;

    this.setState({
      todosData:[
        {
          id: Math.random(),
          value: value,
          hasCompleted: false

        },
        ...todosData
      ],
      inputVal: ''
    });

  }

  // 统一切换所有tudo的完成状态
  onToggleAll=(ev)=>{
    let {checked} = ev.target;

    let {todosData} = this.state;

    todosData = todosData.map(elt=>{
      elt.hasCompleted = checked;
      return elt;
    });

    this.setState({todosData});

  }

  // 切换 todo 的完成状态
  onToggleTodoCompletedStatus=(id)=>{
    let {todosData} = this.state;

    todosData = todosData.map(elt=>{

      if(elt.id === id){
        elt.hasCompleted = !elt.hasCompleted;
      }
      return {...elt};
    });

    this.setState({todosData});

  }

  // 删除一个todo
  onDestroy=( id )=>{
    let {todosData}  = this.state;

    todosData = todosData.filter((elt)=>{
      return elt.id !== id;
    });

    this.setState({todosData});

  }

  // 清除所有完成的 todo
  onClearCompletedTodo=()=>{
    let {todosData} = this.state;

    todosData = todosData.filter((elt)=>{
      return !elt.hasCompleted;
    });

    this.setState({todosData});

  }


  render(){

    let {
      onKeyDownPost,
      onDestroy,
      onClearCompletedTodo,
      inputChange,
      onToggleAll,
      onToggleTodoCompletedStatus,
      changeView,
      editTodoDone
    } = this;

    let {todosData, inputVal, view} = this.state;

    let {location:{pathname}} = this.props;


    let items = null,
    footer = null,
    itemsBox = null;

    let leftCount = todosData.length;

    items = todosData.filter(elt=>{
      if(elt.hasCompleted) leftCount--;
      switch (pathname) {
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
            onDestroy,
            todo: elt,
            onToggle: onToggleTodoCompletedStatus,
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
            onClearCompletedTodo,
            pathname
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

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App}/>
    </Switch>
  </Router>

  , document.getElementById('root'));
