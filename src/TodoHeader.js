import React,{useState} from 'react'


function TodoHeader({info}) {
    const saveData=(e)=>{
        info.setData((previousValue)=>{
            return{
                ...info.data,
                changingInput:e.target.value,

            }
        })
    }
    
  return (
    <div className="todo__body">
        <input type="text" placeholder="type to-do" className="input" value={info.data.changingInput} onChange={saveData}/>
        <button className="addToDo__button" onClick={info.addToLocalStorage}>Add todo...</button>
    </div>
  )
}

export default TodoHeader