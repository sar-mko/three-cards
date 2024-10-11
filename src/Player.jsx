import React, { useState, useEffect } from 'react'
import Card from './assets/Card'

const Player = ({playerNum, data}) => {
    // const players = {player1:[0,1], player2:[2,3]}
    const [playerData, SetPlayerData] = useState('')

    function makeNewCard(){

    }
 
    useEffect(() => {
        console.log(data)
        if(data && playerNum === 1 ){
            SetPlayerData(data.slice(0,2))
            // setCardCode()
        }else if(data && playerNum === 2 ){
            SetPlayerData(data.slice(2))
        }
        console.log(playerData)
    }
    ,[data])

    // async function assignCards(){
    //         data.cards.forEach(item => {
    //             <Card item={item} />
    //         })
    // }
  return (
    <>
        <div>
            <h2>{`Player ${playerNum}`}</h2>
            {playerData.length ?  playerData.map(item => 
                <Card key={crypto.randomUUID()} item={item} />
            ) : <Card key={crypto.randomUUID()} item={false} />}
            <button onClick={() => getOneCard()}>add a card</button>
        </div>
    </>
  )
}

export default Player