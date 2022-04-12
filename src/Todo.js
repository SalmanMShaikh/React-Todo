import React,{useState} from 'react'

function Todo({value}) {
    const[isChecked, setIsChecked] = useState(false);
    const toggleCheckbox =(e)=>{
        setIsChecked(!isChecked)
    }
  return (
    <div className="todo">
        <p className={isChecked?"strike":"todoPara"}>{value}</p>
        <input type="checkbox" checked={isChecked? true:false} onChange={toggleCheckbox}/>
        <button>edit</button>
        <button>delete</button>
    </div>
  )
}

export default Todo