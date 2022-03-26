import React, { useState,useEffect } from 'react'
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

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

  const [rollsRequired, setRollsRequired] = useState(0)

  const [dice, setDice] = useState(allNewDice())

  const [timeTaken, setTimeTaken] = useState(0)

  const [tenzies, setTenzies] = useState(false)


  useEffect(() => {
    setTimeTaken({
      startTime: new Date() * 1,
    })
  }, [])
  


  const rollDice = () => {
    setRollsRequired((prevValue) => prevValue + 1)

    if(!tenzies){
      setDice((oldDice) => {
        return oldDice.map((item) => {
          return item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
        })
      })
    }
    else{
      setRollsRequired(0)
      setTenzies(false)
      setDice(allNewDice())
      setTimeTaken({
        startTime: new Date() * 1,
      })
    }

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

  
    useEffect(() => {
      setTimeTaken((prevValue) => {
        return {
          ...prevValue,
          endTime:( new Date() * 1) - prevValue.startTime
        }
      })     
    }, [tenzies]) 
  

  return (
    <>
      <main className="">
        <div className="h-[90vh] mx-[20%] my-[5vh] bg-gray-100  rounded-lg flex flex-col justify-around">
          {tenzies && <Confetti />}
          <h1 className="text-center text-[5vw] text-red-600 italic">Tenzies</h1>

          <div className='w-[50%] items-center mx-auto bg-violet-500 rounded-md  shadow-md'>
          {tenzies && <h1 className='text-center font-[gabriola] text-[2vw] z-10 h-[10vh] text-yellow-200 animation'>Congratulations!!!</h1>}
          {tenzies && <h1 className='text-center text-white font-[ronnia] text-[2vw] z-10'>Rolls Required: {rollsRequired}</h1>}
          {tenzies && <h1 className='text-center text-white font-[ronnia] text-[2vw] z-10'>Time Taken : {timeTaken.endTime/1000} sec</h1>}
          </div>

          <p className="text-center text-[2vw]">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid grid-cols-5  p-4 gap-4">
            {diceElements}
          </div>


          <button onClick={rollDice} className='w-[20%] h-[7%] border-2 mx-auto text-3xl  font-[gabriola] bg-blue-600 text-white rounded-md hover:bg-blue-500'>{tenzies ? "New Game" : "ROLL"}</button>
        </div>
      </main>
    </>
  );
}

export default App;
