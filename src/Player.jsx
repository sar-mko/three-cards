import React, { useState, useEffect } from 'react'
import Card from './assets/Card'

const Player = ({playerNum, data}) => {
    const [playerData, SetPlayerData] = useState('')
 
    useEffect(() => {
        // console.log(data)
        if(data && playerNum === 1 ){
            SetPlayerData(data.slice(0,2))
        }else if(data && playerNum === 2 ){
            SetPlayerData(data.slice(2))
        }
    }
    ,[data])

  return (
    <>
        <div>
            <h2>{`Player ${playerNum}`}</h2>
            {playerData.length ?  playerData.map(item => 
                <Card key={crypto.randomUUID()} item={item} />
            ) : <Card key={crypto.randomUUID()} item={false} />}
        </div>
    </>
  )
}

export default Player