import { set } from 'mongoose';
import { useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]




function App() {

  // State to store the cards in for a came
  const [cards, setCards] = useState([])
  // State for the turns a user takes to complete the game
  const [turns, setTurns] = useState(0);
  // States to handle the user choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)



  // Shuffle Cards function
  // 1. take the cards and duplicate them so 12 instead of 6 spread
  // 2. Sort then randomise the cards 
  // 3. for each card we add a new id property to it
  // 4. setCards will update the state to be the shuffled cards
  // 5. setTurns starting at 0
  const ShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }


  // Handling a choice
  const handleChoice = (card) => {
    // handling either choice 2 or choice 1
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={ShuffleCards}>New Game</button>

      {/* grid to show the cards */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App