import {useRef, useEffect, useState} from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const img4 = useRef(null);
  const [winner, setWinner] = useState('Who Wins?');
  const DECK_ID = 'kls23f526wq1'
  // const text1 = document.querySelector('h3')
  // const img1 = document.getElementById('img1')
  // const img2 = document.getElementById('img2')
  const winners = {'A':0,'K':1,'Q':2,'J':3,0:4,9:5,8:6,7:7,6:8,5:9,4:10,3:11,2:12}
  const check = {'A':1,'K':10,'Q':10,'J':10, 0:10}
  // const winnerText = document.querySelector('h3')
  
  useEffect(() => {
    const element = img1.current;
    const element2 = img2.current;
    console.log(element);
    console.log(element.id);
    console.log(element2);
    // console.log(winnerText)
    // console.log(element.src)
  }, []);
  
  async function getDeck() {
      try {
          const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`)
          const data = await res.json()   
          console.log('shuffled')     
          console.log(img1, img2)
      }catch(err){
          console.log(err)
      }

  }
  async function getCard() {
      try {
          const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=4`)
          const data = await res.json()

          if(data.success){
              img1.current.src = data.cards[0].image
              img2.current.src = data.cards[1].image
              img3.current.src = data.cards[2].image
              img4.current.src = data.cards[3].image
          }
          if(data.remaining < 4){
            getDeck()
          }
          console.log(data)
          //from the card's code, grab everything before the last letter
          let playerOneCode1 = winners[data.cards[0].code.slice(0,-1)]
          let playerOneCode2 = winners[data.cards[1].code.slice(0,-1)]
          // console.log('code' , data.cards[0].code, 'slice', playerOneCode1)
         
          let playerTwoCode1 = winners[data.cards[2].code.slice(0,-1)]
          let playerTwoCode2 = winners[data.cards[3].code.slice(0,-1)]
          // console.log('code' , data.cards[1].code, 'slice', playerTwoCode)
          findWinner(playerOneCode1,playerOneCode2, playerTwoCode1, playerTwoCode2)
      }catch(err){
          console.log(err)
          // getDeck()
      }
  }
  
  function findWinner(p1CardOne,p1CardTwo,p2CardOne,p2CardTwo){
      if(p1CardOne + p1CardTwo < p2CardOne + p2CardTwo ){
          setWinner('Player One Wins!')
      }else if(p1CardOne + p1CardTwo > p2CardOne + p2CardTwo ){
          setWinner('Player Two Wins!')
      }else{
          setWinner('Tie :)')
      }
  }
  
  return (
    <>
    <h1>Higher Cards</h1>

    <button onClick={() => getDeck()}>Shuffle Deck</button>
    <button onClick={() => getCard()}>Hand Cards</button>

    <section>
        <div>
            <h2>Player one</h2>
            <img ref={img1} id="img1" alt=""/>
            <img ref={img2} id="img2" alt=""/>
        </div>
        
        <div>
            <h2>Player two</h2>
            <img ref={img3} id="img3" alt=""/>
            <img ref={img4} id="img4" alt=""/>
        </div>
    </section>
    <h3>{winner}</h3>

</>
   
  )
}

export default App

{/* <div>
  <a href="https://vitejs.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p>
</> */}