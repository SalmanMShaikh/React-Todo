import TodoHeader from "./TodoHeader";
import React,{useState, createContext , useEffect} from 'react'
import "../todo.css"
import TodoBody from "./TodoBody";


const Context = createContext(null)

function App() {
  const[isChecked, setIsChecked] = useState(false);

  const[data,setData]=useState({
    changingInput:"",
    FinalInput:"",
    array:[],
    indexOfEditedElement:null,
    
  })

  const addToLocalStorage = (e)=>{

   
    if(localStorage.getItem("todos")){
      let array = JSON.parse(localStorage.getItem("todos"))
      array.push({value:e.target.previousElementSibling.value,checked:false});
      localStorage.setItem("todos", JSON.stringify(array))
    
    }else{
      localStorage.setItem("todos",JSON.stringify([{value:e.target.previousElementSibling.value,checked:false}]));
    }
  }

  const renderUI =()=>{
    if(localStorage.getItem("todos")){
      let array = Array.from(JSON.parse(localStorage.getItem("todos")))
      setData((previousValues)=>{
        return{
          ...previousValues,
          array: array,
        }
      })
    }
  }

  

  const save = (e)=>{
    
    e.target.previousElementSibling.style.display ="inline-block";
    e.target.previousElementSibling.previousElementSibling.style.display= "inline-block"
    e.target.parentElement.firstChild.nextElementSibling.style.display = "inline-block"
    e.target.style.display = "none"
    let editedData = e.target.parentElement.firstChild.innerText
    e.target.parentElement.firstChild.contentEditable = false;
    let array = Array.from(JSON.parse(localStorage.getItem("todos")))
  
    
    //removing previous data from array
    array.splice(data.indexOfEditedElement,1)

    let obj={value:editedData,checked:false}
    //adding updated data to array
    array.splice(data.indexOfEditedElement,0,obj)
    
    //saving data to localStorage
    localStorage.setItem("todos", JSON.stringify(array))
  }

  const editData = (e,isChecked,setIsChecked)=>{
    if(isChecked){
      setIsChecked(false)
    }
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "none";
    e.target.previousElementSibling.style.display="none";
    let button = document.createElement("button");
    button.innerText = "save";
    button.addEventListener("click",(e)=>{
      save(e);
    })
   button.className = "button"
    e.target.parentElement.append(button);
    e.target.previousElementSibling.previousElementSibling.contentEditable = true;
    let array = Array.from(JSON.parse(localStorage.getItem("todos")));

   
    array.forEach((element,index)=>{
      if(element.value === e.target.parentElement.firstChild.innerText ){
        setData((previousValues)=>{
          return {
            ...previousValues,
            indexOfEditedElement: index,
          }
        })
      }
    })

    // localStorage.setItem("todos", JSON.stringify(updatedArray));
   
  }


  const deleteTodo =(e)=>{
    let array = Array.from(JSON.parse(localStorage.getItem("todos")));
    let indexOfDeletedElement =null;
    array.forEach((element,index)=>{
      if(element.value === e.target.parentElement.firstChild.innerText){
          indexOfDeletedElement = index;
      }
    })
    array.splice(indexOfDeletedElement,1)

    localStorage.setItem("todos",JSON.stringify(array))
   
  }

  useEffect(()=>{
 
    renderUI()
  },[editData,deleteTodo,addToLocalStorage])
 
  return (
    <Context.Provider value={{
      isChecked:isChecked,
      setIsChecked:setIsChecked,
      deleteTodo: deleteTodo,
      data: data,
      setData:setData
    }}>
    <div className="App">

       <h1 className="todo__heading">To-Do</h1>
       <TodoHeader info={{
         data: data,
         setData:setData,
         addToLocalStorage: addToLocalStorage
       }}/>

        <TodoBody info={{
          data:data,
          setData:setData,
          editData:editData,
        }}/>
    </div>
    </Context.Provider>
  );
}

export {App,Context};























/*
import TodoHeader from "./TodoHeader";
import React,{useState, createContext , useEffect} from 'react'
import "./todo.css"
import TodoBody from "./TodoBody";


const Context = createContext(null)

function App() {
  const[isChecked, setIsChecked] = useState(false);

  const[data,setData]=useState({
    changingInput:"",
    FinalInput:"",
    array:[],
    indexOfEditedElement:null,
    
  })

  const addToLocalStorage = (e)=>{

   
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

  

  const save = (e)=>{
    
    e.target.previousElementSibling.style.display ="inline-block";
    e.target.previousElementSibling.previousElementSibling.style.display= "inline-block"
    e.target.parentElement.firstChild.nextElementSibling.style.display = "inline-block"
    e.target.style.display = "none"
    let editedData = e.target.parentElement.firstChild.innerText
    e.target.parentElement.firstChild.contentEditable = false;
    let array = JSON.parse(localStorage.getItem("todos"))
  
    
    //removing previous data from array
    array.splice(data.indexOfEditedElement,1)

    //adding updated data to array
    array.splice(data.indexOfEditedElement,0,editedData)
    
    //saving data to localStorage
    localStorage.setItem("todos", JSON.stringify(array))
  }

  const editData = (e)=>{
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "none";
    e.target.previousElementSibling.style.display="none";
    let button = document.createElement("button");
    button.innerText = "save";
    button.addEventListener("click",(e)=>{
      save(e);
    })
   button.className = "button"
    e.target.parentElement.append(button);
    e.target.previousElementSibling.previousElementSibling.contentEditable = true;
    let array = JSON.parse(localStorage.getItem("todos"));

   
    array.forEach((element,index)=>{
      if(element === e.target.parentElement.firstChild.innerText ){
        setData((previousValues)=>{
          return {
            ...previousValues,
            indexOfEditedElement: index,
          }
        })
      }
    })

    // localStorage.setItem("todos", JSON.stringify(updatedArray));
   
  }


  const deleteTodo =(e)=>{
    let array = JSON.parse(localStorage.getItem("todos"));
    let indexOfDeletedElement =null;
    array.forEach((element,index)=>{
      if(element === e.target.parentElement.firstChild.innerText){
          indexOfDeletedElement = index;
      }
    })
    array.splice(indexOfDeletedElement,1)

    localStorage.setItem("todos",JSON.stringify(array))
   
  }

  useEffect(()=>{
 
    renderUI()
  },[editData,deleteTodo,addToLocalStorage])
 
  return (
    <Context.Provider value={{
      isChecked:isChecked,
      setIsChecked:setIsChecked,
      deleteTodo: deleteTodo
    }}>
    <div className="App">

       <h1 className="todo__heading">To-Do</h1>
       <TodoHeader info={{
         data: data,
         setData:setData,
         addToLocalStorage: addToLocalStorage
       }}/>

        <TodoBody info={{
          data:data,
          setData:setData,
          editData:editData,
        }}/>
    </div>
    </Context.Provider>
  );
}

export {App,Context};
*/