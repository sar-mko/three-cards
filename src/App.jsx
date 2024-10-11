import {useRef, useEffect, useState} from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Player from './Player';

function App() {
  const [winner, setWinner] = useState('Who Wins?');
  const [cards, setCards] = useState([])
  const [playerOneCode, SetPlayerOneCode] = useState([])
  const [playerTwoCode, SetPlayerTwoCode] = useState([])

  const DECK_ID = 'kls23f526wq1'
  const winners = {'A':0,'K':1,'Q':2,'J':3,0:4,9:5,8:6,7:7,6:8,5:9,4:10,3:11,2:12}
//   const check = {'A':1,'K':10,'Q':10,'J':10, 0:10}
  // const winnerText = document.querySelector('h3')
  
  useEffect(() => {
    
  }, [cards]);
  
  async function getDeck() {
      try {
          const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`)
          const data = await res.json()   
          console.log('shuffled')     
      }catch(err){
          console.log(err)
      }

  }
  async function getCard() {
      try {
          const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=4`)
          const data = await res.json()
          console.log(data)
          if(data.success){
            console.log('oh')
                setCards(data.cards)
                console.log('hi')
                SetPlayerOneCode([winners[data.cards[0].code.slice(0,-1)], winners[data.cards[1].code.slice(0,-1)]])
                console.log('check again')
                SetPlayerTwoCode([winners[data.cards[2].code.slice(0,-1)], winners[data.cards[3].code.slice(0,-1)]])
                console.log(1, winner)
                await findWinner(playerOneCode, playerTwoCode)
                console.log(2, winner)
        //     )
        }
          if(data.remaining < 4){
            getDeck()
          }

      }catch(err){
          console.log(err)
      }
  }
  
  function findWinner(pOne, pTwo){
      if(pOne[0] + pOne[1] > pTwo[0] + pTwo[1]){
          setWinner('Player One Wins!')
      }else if(pOne[0] + pOne[1] < pTwo[0] + pTwo[1]){
          setWinner('Player Two Wins!')
      }else{
          setWinner('Tie :)')
      }
      console.log('did we get here')

  }
  
  function resetDeck(option){
          setCards('')
            setWinner('Who wins?')
  }

  return (
    <>
    <h1>Higher Cards</h1>

    <button onClick={() => getDeck()}>Shuffle Deck</button>
    <button onClick={() => getCard()}>Hand Cards</button>
    <button onClick={() => resetDeck('all')}>Reset Deck</button>
    <Player id={'ply1'} playerNum={1} data={cards} />
    <Player id={'ply2'} playerNum={2} data={cards} />
    <button onClick={() => getOneCard()}>add a card</button>
    <h3>{winner}</h3>

</>
   
  )
}

export default App