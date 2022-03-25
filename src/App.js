import React, { useState,useEffect } from 'react'
import Die from "./components/Die";
import { nanoid } from 'nanoid'

function App() {

  const allNewDice = () => {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())


  const rollDice = () => {
    setDice((oldDice) => {
      return oldDice.map((item) => {
        return item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
      })
    })

  }

  const holdDice = (id) => {
    setDice((oldDice) => {
      return oldDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item
      })
    })
  }

  const diceElements = dice.map((item) => {
    return (
      <Die value={item.value} key={item.id} isHeld={item.isHeld} holdDice={() => holdDice(item.id)} />
    )
  })

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every((item) => {
      return item.isHeld === true
    })
    const firstValue = dice[0].value
    const sameValues = dice.every((item) => {
      return item.value === firstValue
    })

    if(allHeld && sameValues){
      setTenzies(true)
      console.log("you won")
    }
  
  }, [dice])
  

  return (
    <>
      <main className="">
        <div className="h-[90vh] mx-[20%] my-[5vh] bg-gray-100  rounded-lg flex flex-col justify-around">
          <h1 className="text-center text-[5vw] ">Tenzies</h1>
          <p className="text-center text-[2vw]">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid grid-cols-5  p-4 gap-4">
            {diceElements}
          </div>
          <button onClick={rollDice} className='w-[20%] h-[7%] border-2 mx-auto text-2xl font-bold bg-blue-600 text-white rounded-md hover:bg-blue-500'>ROLL</button>
        </div>
      </main>
    </>
  );
}

export default App;
