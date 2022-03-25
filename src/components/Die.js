import React from 'react'

const Die = (props) => {
  return (
    

    <div onClick={props.holdDice} className={`h-[10vh] bg-white shadow-md rounded-md flex justify-center items-center cursor-pointer ${props.isHeld ? "bg-green-600" : "hover:bg-gray-50" }`}>
      <h2 className='text-2xl font-bold '>{props.value}</h2>
    </div>
    
  )
}

export default Die