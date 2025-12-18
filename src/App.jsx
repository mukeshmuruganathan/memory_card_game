import React, { useEffect, useState } from 'react'
import GameHeader from "./components/GameHeader";
import Card from './components/Card';
import Winmessage from './components/Winmessage';
const cardValues=[
  "🍌",
  "🍇",
  "🍊", 
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍏",
  "🍌",
  "🍇",
  "🍊", 
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍏"
]

const App = () => {
  const[cards,setCards]=useState([]);
  const[flippedcard,setFlippedcard]=useState([]);
  const[matchedcard,setMatchedcard]=useState([]);
  const[score,setScore]=useState(0);
  const[moves,setMoves]=useState(0);
  const[isLocked,setIsLocked]=useState(false);
  
  const shuffleArray =(array)=>{
    const shuffled = [...array];
    for(let i=shuffled.length-1 ;i > 0 ; i--){
      const j=Math.floor(Math.random() * (i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame=()=>{
    const shuffled = shuffleArray(cardValues);
    const finalcards=cardValues.map((value,index)=>({
       id: index,
       value,
       isFlipped: false,
       isMatched: false,
    }
    ));
    setCards(finalcards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setFlippedcard([]);
    setMatchedcard([]);
  }
  useEffect(()=>{
    initializeGame();

  },[])
  const handleCardClick=(card)=>{
    if(card.isFlipped|| card.isMatched ||isLocked||flippedcard.length === 2){
      return;
    }
    const newCards=cards.map((c)=>{
      if(c.id===card.id){
        return{...c, isFlipped:true};
      }
      else{
        return c;
      }
  })
      setCards(newCards);
    const newFlippedcards=[...flippedcard,card.id];
    setFlippedcard(newFlippedcards);
    //check for match if two cards are flipped
    if(flippedcard.length === 1){
      setIsLocked(true);
      const firstCard=cards[flippedcard[0]];
      if(firstCard.value===card.value){
        setTimeout(()=>{
        setMatchedcard((prev)=>[...prev, firstCard.id, card.id]);
        setScore((prev)=>prev+1);
        const newMatchedCards=cards.map((c)=>{
        if(c.id===card.id || c.id===firstCard.id){
          return{...c, isMatched:true};
        }
        else{
         return c;
        }
        });
       setCards((prev)=>
        prev.map((c)=>{
        if(c.id===card.id || c.id===firstCard.id){
          return{...c, isMatched:true};
        }
        else{
         return c;
        }
        }));
       setFlippedcard([]);
       setIsLocked(false);
        },500)        
      }
      else{
        //flip back card1,card2
        setTimeout(()=>{
          const flippedBackCard= newCards.map((c)=>{
          if(newFlippedcards.includes(c.id)||c.id === card.id){
            return{...c,isFlipped: false};
          }
          else{
            return c;
          }
        });
             setCards(flippedBackCard);
             setIsLocked(false);
             setFlippedcard([]);
        },1000)
       
      }
      setMoves((prev)=>prev +1)
    }
  }
  const isGameComplete= matchedcard.length===cardValues.length;
  return (
    <div className="app">
      <GameHeader score={score} move={moves} onReset={initializeGame}/>
      {isGameComplete &&< Winmessage move={moves}/>}
      <div className="cards-grid">
        {cards.map((card)=>(
          <Card key={card.id} card={card} onClick={handleCardClick}/>
        ))}

     </div>
  </div>
  )
}
export default App
