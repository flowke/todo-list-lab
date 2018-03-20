import React from 'react';
import Item from './Item';
import Footer from './Footer';


export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todosData: [],
            inputVal: '',
            view: 'all'
        }

        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.itemEditDone = this.itemEditDone.bind(this);
    }

    itemEditDone(todo, value){

        let {todosData} = this.state;

        todosData = todosData.map(elt=>{
            if(todo.id === elt.id){
                elt.value = value;
            }
            return elt;
        });

    }


    changeView(view){
        this.setState({view});
    }

    inputChange(ev){
        this.setState({
            inputVal: ev.target.value
        })
    }

    handleKeyDownPost(ev){

        if(ev.keyCode !== 13) return;

        let {inputVal} = this.state;

        let value = inputVal.trim();

        if(value===''){
            return;
        }

        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompleted = false;

        let {todosData} = this.state;

        todosData.push(todo);

        this.setState({
            todosData,
            inputVal: ''
        });

    }

    toggleAll(ev){
        let {checked} = ev.target;

        let {todosData} = this.state;

        todosData = todosData.map(elt=>{
            elt.hasCompleted = checked;
            return elt;
        });

        this.setState({todosData});

    }

    onToggle(todo){
        let {todosData} = this.state;

        todosData = todosData.map(elt=>{

            if(elt.id === todo.id){
                elt.hasCompleted = !elt.hasCompleted;
            }

            return elt;


        });

        this.setState({todosData});

    }

    onDestroy( todo ){
        let {todosData}  = this.state;

        todosData = todosData.filter((elt)=>{
            return elt.id !== todo.id;
        });

        this.setState({todosData});

    }

    onClearCompleted(){
        let {todosData} = this.state;

        todosData = todosData.filter((elt)=>{
            return !elt.hasCompleted;
        });

        this.setState({todosData});

    }


    render(){

        let {handleKeyDownPost, onDestroy, onClearCompleted, inputChange, toggleAll, onToggle, changeView, itemEditDone} = this;

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
                        onToggle,
                        itemEditDone
                    }}
                    key={i}
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
                        onChange={toggleAll}
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
                        onClearCompleted,
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
                        onKeyDown= {handleKeyDownPost}
                        placeholder="type something here"
                    />
                </header>

                {itemsBox}
                {footer}
            </div>
        );
    }
}
