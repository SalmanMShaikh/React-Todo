import React from 'react'
import Todo from './Todo'

function TodoBody({info}) {
  return (
        <>
        {
           info.data.array?.map((value)=>{
               return <Todo value={value}/>
           }) 
        }
        </>
  )
}

export default TodoBody