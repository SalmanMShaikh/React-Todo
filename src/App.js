import TodoHeader from "./TodoHeader";
import React,{useState} from 'react'
import "./todo.css"
import TodoBody from "./TodoBody";
import { useEffect } from "react";

function App() {
  const[data,setData]=useState({
    changingInput:"",
    FinalInput:"",
    array:[]
  })

  const addToLocalStorage = (e)=>{

    console.log(e.target.previousElementSibling)
    if(localStorage.getItem("todos")){
      let array = JSON.parse(localStorage.getItem("todos"))
      array.push(e.target.previousElementSibling.value);
      localStorage.setItem("todos", JSON.stringify(array))
    
    }else{
      localStorage.setItem("todos",JSON.stringify([e.target.previousElementSibling.value]));
    }
  }

  const renderUI =()=>{
    if(localStorage.getItem("todos")){
      let array = JSON.parse(localStorage.getItem("todos"))
      setData((previousValues)=>{
        return{
          ...previousValues,
          array: array,
        }
      })
    }
  }
  useEffect(()=>{
 
    renderUI()
  },[addToLocalStorage])
 
  return (
    <div className="App">
       <h1 className="todo__heading">To-Do</h1>
       <TodoHeader info={{
         data: data,
         setData:setData,
         addToLocalStorage: addToLocalStorage
       }}/>

        <TodoBody info={{
          data:data,
          setData:setData
        }}/>
    </div>
  );
}

export default App;
