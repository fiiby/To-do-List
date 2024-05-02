import React, {useState, useEffect} from 'react';
import './index.css';
// import {TiDelete} from "react-icons/ai";
// import './App.css'

const  App = ()=>  {
 
  const [allTodos,setAllTodos] =useState([]);
  const [newTitle,setNewTitle] =useState("");
  const [newDescription,setNewDescription]= useState("");
  const [completedTodos,setCompletedTodos] =useState([]);

 const [isCompleteScreen,setIsCompleteScreen]=useState(false);

  const handleAddTodo =()=> {
    let newTodoItem
= {
  title: newTitle,
  description: newDescription
}

  let    updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setAllTodos(updatedTodoArr);
//more search in this 
localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };

  const handelDeleteTodo =(index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setAllTodos(reducedTodo)
  }
const handelComplete =(index) =>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() +1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = " "+ dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

  let filteredItem = {
    ...allTodos[index],
    completedOn :completedOn
  }

  let updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.push(filteredItem);
  setCompletedTodos(updatedCompletedArr);
  handelDeleteTodo(index);
  
  localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));

};
const handelDeleteCompletedTodo = (index)=>{
  let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
}
// more search in this section:
useEffect (() => {
  let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

  if (savedTodo){
    setAllTodos(savedTodo);
  }

  if (savedCompletedTodo){
    setCompletedTodos (savedCompletedTodo);
  }
},[]);

  return (
    <div className='App'>
          <h1>My Todo's List</h1>

            <div className="todo-wrapper">
              <div className='todo-input'>
                  <div className='todo-input-item'>
                    <label>Title</label>
                    <input type="text" value={(newTitle)} onChange={(e)=>setNewTitle(e.target.value)} placeholder=" what's the task?"/>
                  </div>
                  <div className='todo-input-item'>

                    <label>Description</label>
                    <input type="text" value={(newDescription)} onChange={(e)=>setNewDescription(e.target.value)} placeholder=" what's the task descri?"/>
              </div>

              <div className='todo-input-item'>
                    <button type='button' onClick={handleAddTodo}    className='primaryBtn'>Add</button>
              </div>
          </div>

          <div className='btn-area'>
                  <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen (false)}>Todo</button>

                   <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen (true)}>Completed</button>
          </div>

            <div className='todo-list'>

             {isCompleteScreen ===false && allTodos.map((item,index)=> {

                return(
                  <div className='todo-list-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                <div>
              
                <i class="fa-solid fa-calendar-xmark" id='check-icon' onClick={()=>handelDeleteTodo(index)} title="Delete">
                </i>
                <i class="fa-regular fa-square-check" onClick={()=>handelComplete(index)} title="complete" >
                </i>
              </div>
              </div>
          )
        })}

        {isCompleteScreen ===true && completedTodos.map((item,index)=> {
                return(
                  <div className='completeList-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <h6><italic>Completed on:{item.completedOn}</italic></h6>
                    </div>
                <div>
             
                <i class="fa-solid fa-calendar-xmark" id='delete-icon' onClick={()=>handelDeleteCompletedTodo(index)} title="Delete"></i>
                
              </div>
              </div>
          );
        })}
            
        </div>
        </div>
        </div>
    );
}

export default App;