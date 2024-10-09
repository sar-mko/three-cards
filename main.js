// require('dotenv').config()
// console.log(process.env)

// const DECK_ID = process.env.DECK_ID
// const text1 = document.querySelector('p')
// const img = document.querySelector('img')
// const img2 = document.getElementById('img2')
// const winners = {'A':0,'K':1,'Q':2,'J':3,10:4,9:5,8:6,7:7,6:8,5:9,4:10,3:11,2:12}
// const winnerText = document.querySelector('h3')


// async function getDeck() {
//     try {
//         const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`)
//         const data = await res.json()        
//     }catch(err){
//         console.log(err)
//     }
// }
// async function getCard() {
//     try {
//         const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=2`)
//         const data = await res.json()
//         if(data.success){
//             img.src = data.cards[0].image
//             img2.src = data.cards[1].image

//         }
//         //from the card's code, grab everything before the last letter
//         let playerOneCode = data.cards[0].code.slice(0,-1)
//         let playerTwoCode = data.cards[1].code.slice(0,-1)
//         findWinner(playerOneCode, playerTwoCode)
//     }catch(err){
//         console.log(err)
//     }
// }

// function findWinner(cardOne,cardTwo){
//     if(winners[cardOne] < winners[cardTwo]){
//         winnerText.innerText = 'Player One Wins!'
//     }else if(winners[cardOne] > winners[cardTwo]){
//         winnerText.innerText = 'Player Two Wins!'
//     }else{
//         winnerText.innerText = 'Tie :)'
//     }
// }
