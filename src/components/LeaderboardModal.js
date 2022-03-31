import React from 'react'

const LeaderboardModal = (props) => {
    // console.log(props.rollsRequired)
    // console.log(props.timeTaken)

    const localStorageArray = JSON.parse(window.localStorage.getItem('user'))
    // console.log("1",localStorageArray)

    const filteredLocalStorageArray = localStorageArray.filter((item) => {
        return item.rollsRequired > 0 && item.timeTaken > 1.000
    })
    // console.log("2",filteredLocalStorageArray)

    const sortedFilteredLocalStorageArray = filteredLocalStorageArray.sort((a, b) => parseFloat(a.timeTaken) - parseFloat(b.timeTaken))
    // console.log("3",sortedFilteredLocalStorageArray)

    const rankingArray = sortedFilteredLocalStorageArray.map((item) => {
        return {
            rollsRequired: item.rollsRequired,
            timeTaken: item.timeTaken
        }
    })

    // console.log("ra",rankingArray)
    // console.log(rankingArray[0].rollsRequired,rankingArray[0].timeTaken)
    // console.log(rankingArray[1].rollsRequired,rankingArray[1].timeTaken)
    // console.log(rankingArray[2].rollsRequired,rankingArray[2].timeTaken)
    // console.log("len",rankingArray.length)

    const rankingTableFunc = () => {
        if(rankingArray.length === 2){
            return <table className="table-auto w-full  border-collapse">
            <thead>
                <tr className='h-[5vh]'>
                    <th className="border border-red-600 text-white w-[20%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rank</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Time Taken</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rolls Required</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >1</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].rollsRequired}</td>
                </tr>
                
            </tbody>
        </table>
        }
        else if(rankingArray.length === 3){
            return <table className="table-auto w-full  border-collapse">
            <thead>
                <tr className='h-[5vh]'>
                    <th className="border border-red-600 text-white w-[20%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rank</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Time Taken</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rolls Required</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >1</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].rollsRequired}</td>
                </tr>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >2</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[1].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[1].rollsRequired}</td>
                </tr>
                
            </tbody>
        </table>
        }
        else{
            return <table className="table-auto w-full  border-collapse">
            <thead>
                <tr className='h-[5vh]'>
                    <th className="border border-red-600 text-white w-[20%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rank</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Time Taken</th>
                    <th className="border border-red-600 text-white w-[40%] font-normal font-[gabriola] text-[4vh] rounded-md" >Rolls Required</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >1</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[0].rollsRequired}</td>
                </tr>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >2</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[1].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[1].rollsRequired}</td>
                </tr>
                <tr className='h-[5vh]'>
                    <td className="border border-red-600 text-yellow-200 text-center" >3</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[2].timeTaken}</td>
                    <td className="border border-red-600 text-yellow-200 text-center" >{rankingArray[2].rollsRequired}</td>
                </tr>
            </tbody>
        </table>
        }
    }

    const leaderboard = rankingTableFunc()

    // take all values of time taken and rolls required in a local array and then make them display the values via them
    // add tanking table correctly, above method crashes the app

    return (
        <div>
            <div className='flex flex-col items-center bg-gray-100'>
                <h1 className='text-[11vw]  md:text-[4vw] font-[gabriola] text-red-600'>Your Score</h1>
                <hr className='h-[0.45vh] bg-black w-[80%]' />
                <div className="flex justify-around w-[80%] mt-[2%]">
                    <h1 className='font-[ronnia] text-[3vw] md:text-[2vw]'>Time Taken: {props.timeTaken} sec</h1>
                    <h1 className='font-[ronnia] text-[3vw] md:text-[2vw]'>Rolls Required: {props.rollsRequired}</h1>
                </div>
                <h1 className='text-[11vw]  md:text-[4vw] font-[gabriola] text-red-600'>Leader Board</h1>
                <hr className='h-[0.45vh] bg-black w-[80%]' />
                <div className="mt-[3%]  bg-violet-700 w-[80%] mb-[2%]">
                    {/* {rankingTable} */}
                    {/* write this as a variable and assign it to a function */}
                    {/* {rankingArray.length === 1 ? rankingTable1 : ""}
                    {rankingArray.length === 2 ? rankingTable2 : ""}
                    {rankingArray.length > 2 ? rankingTable3 : ""} */}
                    {leaderboard}
                </div>
            </div>
        </div>
    )
}

export default LeaderboardModal