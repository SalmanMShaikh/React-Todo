import React,{useState, useContext} from 'react'
import {Context} from "./App.js"

function Todo({values,info}) {
    const value = useContext(Context)
    const[isChecked, setIsChecked] = useState(false);
    const toggleCheckbox =(e)=>{
        setIsChecked(!isChecked)
    }
  return (
    <div className="todoOuterContainer">
      <div className="todoInnerContainer">
        <p className={isChecked?"strike":"todoPara"}>{values}</p>
        <input className='checkboxInput' type="checkbox" checked={isChecked? true:false} onChange={toggleCheckbox}/>
        <button className="button" onClick={info.editData}>edit</button>
        <button className="button" onClick={value.deleteTodo}>delete</button>
        </div>
    </div>
  )
}

export default Todo