import React, { useState, useEffect } from 'react'
import Card from './Card'

const Player = ({playerNum, data, addCard}) => {
    const [playerData, setPlayerData] = useState([])
 
    useEffect(() => {
        setPlayerData(data)
    }
    ,[data])

    // const getCard = () => {
    //     const newCard = addCard();
    //     setPlayerData(prevData => [...prevData, newCard]);

    // }
  return (
    <>
        <div>
            <h2>{`Player ${playerNum}`}</h2>
            {playerData.length ?  playerData.map(item => 
                <Card key={crypto.randomUUID()} item={item} />
            ) : <Card key={crypto.randomUUID()} item={false} />}
            {/* <button>add a card</button> */}
            <button onClick={() => addCard(playerNum)}>add a card</button>
        </div>
    </>
  )
}

export default Player