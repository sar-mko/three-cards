import {useRef, useEffect, useState} from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Player from './Player';

function App() {
  const [winner, setWinner] = useState('Who Wins?');
  const [cards, setCards] = useState([])
  const [playerOneCode, setPlayerOneCode] = useState([])
  const [playerTwoCode, setPlayerTwoCode] = useState([])
  const [playerOneData, setPlayerOneData] = useState([])
  const [playerTwoData, setPlayerTwoData] = useState([])

  const DECK_ID = 'kls23f526wq1'
  const winners = {'A':1,'K':10,'Q':10,'J':10,0:10,9:9,8:8,7:7,6:6,5:5,4:4,3:3,2:2}

  useEffect(() => {
    if (playerOneCode.length > 0 && playerTwoCode.length > 0) {
      findWinner(playerOneCode, playerTwoCode);
    }
  }, [playerOneCode, playerTwoCode]);
  
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

          if(data.success){

            const newCards = data.cards

                setCards(newCards);

                const newPlayerOneCode = [
                    winners[newCards[0].code.slice(0, -1)], 
                    winners[newCards[1].code.slice(0, -1)]
                  ];
                  
                  const newPlayerTwoCode = [
                    winners[newCards[2].code.slice(0, -1)], 
                    winners[newCards[3].code.slice(0, -1)]
                  ];
                
                const p1Data = newCards.slice(0,2)
                const p2Data = newCards.slice(2)

                setPlayerOneCode(newPlayerOneCode)
                setPlayerTwoCode(newPlayerTwoCode)

                setPlayerOneData(p1Data)
                setPlayerTwoData(p2Data)
        }
          if(data.remaining < 4){
            getDeck()
          }

      }catch(err){
          console.log(err)
      }
  }

  const addCard = async (playerNum) => {
    try {
        const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=1`)
        const data = await res.json()

        if(data.success){
        const newCard = data.cards[0];
        setCards(prevCards => [...prevCards, newCard]); 
        if(playerNum === 1 ){
            setPlayerOneCode(prevCards => [...prevCards, newCard])
            setPlayerOneData(prevCards => [...prevCards, newCard])
        }else if(data && playerNum === 2 ){
            setPlayerTwoCode(prevCards => [...prevCards, newCard])
            setPlayerTwoData(prevCards => [...prevCards, newCard])
        }
        return newCard;
        }

        if(data.remaining < 4){
          getDeck()
        }

    }catch(err){
        console.log(err)
    }

  };
  
  function findWinner(pOne, pTwo){
      if(pOne[0] + pOne[1] > pTwo[0] + pTwo[1]){
          setWinner('Player One Wins!')
      }else if(pOne[0] + pOne[1] < pTwo[0] + pTwo[1]){
          setWinner('Player Two Wins!')
      }else{
          setWinner('Tie :)')
      }
  }
  
  function resetDeck(option){
    setCards([]);
    setPlayerOneData([]);
    setPlayerTwoData([]);
    setWinner('who wins?')
  }

  return (
    <>
        <h1>Higher Cards</h1>

        <button onClick={() => getDeck()}>Shuffle Deck</button>
        <button onClick={() => getCard()}>Hand Cards</button>
        <button onClick={() => resetDeck()}>Reset Deck</button>
        {/* newCards[0].code.slice(0, -1) */}
        <Player id={'ply1'} playerNum={1} data={playerOneData} addCard={addCard}  />
        <Player id={'ply2'} playerNum={2} data={playerTwoData} addCard={addCard}/>

        {/* <button onClick={() => addCard()}>add a card</button> */}
        <h3>{winner}</h3>
    </>
   
  )
}

export default App