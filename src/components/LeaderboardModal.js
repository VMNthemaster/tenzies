import React from 'react'

const LeaderboardModal = (props) => {
    window.localStorage.getItem('user')
    const localStorageArray = JSON.parse(window.localStorage.getItem('user'))
    
    // const b = props.rollsRequired
    // const c = props.timeTaken

    const filteredLocalStorageArray = localStorageArray.filter((item) => {
        return item.rollsRequired > 0 && item.timeTaken > 1.000
    })
    console.log(filteredLocalStorageArray)

    const sortedFilteredLocalStorageArray = filteredLocalStorageArray.sort((a, b) => parseFloat(a.timeTaken) - parseFloat(b.timeTaken))
    console.log(sortedFilteredLocalStorageArray)

    return (
    <div>
        <div className='flex flex-col items-center bg-gray-100'>
        <h1 className='text-[10vw] md:text-[4vw] font-[gabriola]'>Your Score</h1>
        <hr className='h-[0.45vh] bg-red-600 w-[80%]' />
        <div className="flex justify-around w-[80%] mt-[2%]">
        <h1 className='font-[ronnia] text-[3vw] md:text-[2vw]'>Time Taken: {props.timeTaken} sec</h1>
        <h1 className='font-[ronnia] text-[3vw] md:text-[2vw]'>Rolls Required: {props.rollsRequired}</h1>
        </div>   
        <h1 className='text-[10vw] md:text-[4vw] font-[gabriola]'>Leader Board</h1>
        <hr className='h-[0.45vh] bg-red-600 w-[80%]'/>

        </div>
    </div>
  )
}

export default LeaderboardModal