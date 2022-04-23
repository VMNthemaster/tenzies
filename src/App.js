import React, { useState, useEffect } from 'react'
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import LeaderboardModal from './components/LeaderboardModal';

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

    if (!tenzies) {
      setDice((oldDice) => {
        return oldDice.map((item) => {
          return item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
        })
      })
    }
    else {
      // this will run after we will click on new game
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

    if (allHeld && sameValues) {
      // console.log(allHeld,sameValues)
      setTenzies((prevValue) => !prevValue)

    }

  }, [dice])


  // useEffect(() => {
    

  //   let localStorageItems = []

  //   if (localStorage.getItem("user") === null) {
  //     // if local storage key "user" is empty, add a fake item
  //     const fakeValue = {
  //       timeTaken: 1000,
  //       rollsRequired: 1000
  //     }
  //     // console.log(fakeValue)
  //     localStorageItems.push(fakeValue)
  //     window.localStorage.setItem('user', JSON.stringify(localStorageItems))
  //     // console.log("first if")

  //   }
  //   else {
  //     // this means local storage is not empty so we will first receive all values form it then add our new value
  //     const localStorageArray = JSON.parse(window.localStorage.getItem('user'))
  //     // console.log(localStorageArray)

  //     // this is done since the values in local storage are getting in wrong way
  //     localStorageItems = localStorageArray.map((item) => {
  //       return item
  //     })
  //     // console.log(localStorageItems)

  //     if (tenzies === true) {
  //       // if we win game, then only add the new values to the local storage
  //       const endTime = ((new Date() * 1) - timeTaken.startTime) / 1000
  //       const newValue = {
  //         rollsRequired: rollsRequired,
  //         timeTaken: endTime
  //       }
  //       // console.log("hi")
  //       // console.log(newValue)
  //       // console.log(localStorageItems)
  //       localStorageItems.push(newValue)
  //       window.localStorage.setItem('user', JSON.stringify(localStorageItems))
  
  
  //       setTimeTaken((prevValue) => {
  //         return {
  //           ...prevValue,
  //           endTime: ((new Date() * 1) - prevValue.startTime)/1000
  //         }
  //       })
  
  //     }

  //   }

  // }, [tenzies])






  return (
    <>
      <main className="">
        <div className="h-[90vh] md:mx-[20%] my-[5vh] bg-gray-100  rounded-lg flex flex-col justify-around">
          {tenzies && <Confetti />}
          <h1 className="text-center text-[10vw] md:text-[5vw] text-red-600 italic">Tenzies</h1>

          <div className='w-[50%] items-center mx-auto bg-violet-500 rounded-md  shadow-md'>
            {tenzies && <h1 className='text-center font-[gabriola] text-[5vw] md:text-[2vw] z-10 h-[10vh] text-yellow-200 animation'>Congratulations!!!</h1>}
            {tenzies && <h1 className='text-center text-white font-[ronnia] animation2 text-[2vw] z-10'>Rolls Required: {rollsRequired}</h1>}
            {tenzies && <h1 className='text-center text-white font-[ronnia] animation2 text-[2vw] z-10'>Time Taken : {((new Date() * 1) - timeTaken.startTime) / 1000} sec</h1>}
          </div>

          <p className="text-center text-[5vw] md:text-[2vw] p-1">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid grid-cols-5  p-4 gap-4">
            {diceElements}
          </div>


          <button onClick={rollDice} className='w-[20%] h-[7%] border-2 mx-auto text-[5vw] md:text-[2vw] font-[gabriola] bg-blue-600 text-white rounded-md hover:bg-blue-500'>{tenzies ? "New Game" : "ROLL"}</button>
        </div>
        {/* <div className='md:mx-[20%] mb-[5vh] rounded-lg'>
          {tenzies && <LeaderboardModal timeTaken={timeTaken.endTime} rollsRequired={rollsRequired} tenzies = {tenzies} />}
        </div> */}
      </main>
    </>
  );
}

export default App;
