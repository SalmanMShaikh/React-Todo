import React,{useState, useContext} from 'react'
import {Context} from "./App.js"

function Todo({values,info}) {
    const allData = useContext(Context)
    const[isChecked, setIsChecked] = useState(false);
    const toggleCheckbox =(e)=>{
 
        setIsChecked(!isChecked)
    }
  return (
    <div className="todoOuterContainer">
      <div className="todoInnerContainer">
        <p className={isChecked?"strike":"todoPara"}>{values.value}</p>
        <input className='checkboxInput' type="checkbox" checked={isChecked? true:false} onChange={toggleCheckbox}/>
        <button className="button" onClick={(e)=>{info.editData(e,isChecked,setIsChecked)}}>edit</button>
        <button className="button" onClick={allData.deleteTodo}>delete</button>
        </div>
    </div>
  )
}

export default Todo