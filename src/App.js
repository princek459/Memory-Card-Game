import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

// Array of cards with their source and matched values
const cardImages = [
  { "src": "/img/lewis.png", matched: false },
  { "src": "/img/yuki.png", matched: false },
  { "src": "/img/charles.png", matched: false },
  { "src": "/img/lando.png", matched: false },
  { "src": "/img/seb.png", matched: false },
  { "src": "/img/bottas.png", matched: false },
]

function App() {

  // State to store the cards in for a came
  const [cards, setCards] = useState([])
  // State for the turns a user takes to complete the game
  const [turns, setTurns] = useState(0);
  // States to handle the user choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [disabled, setDisabled] = useState(false)

  // Shuffle Cards function to start the game
  // 1. take the cards and duplicate them so 12 instead of 6 spread
  // 2. Sort then randomise the cards 
  // 3. for each card we add a new id property to it
  // 4. setCards will update the state to be the shuffled cards
  // 5. setTurns starting at 0
  const ShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }


  // Handling a choice
  const handleChoice = (card) => {
    // handling either choice 2 or choice 1
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Comparing 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      // checking if the source of the 2 cards match and console logging
      if (choiceOne.src === choiceTwo.src) {
        console.log('Matched!')
        // Seating matched property to true by updating the state of the selected cards
        setCards(prevCards => {
          // returning new array of cards, taking the previous cards using map method
          return prevCards.map(card => {
            // Card choice matches the choice we return true to them and return them
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        // Delaying how long the cards stay flipped for
        setTimeout(() => resetTurn(), 1000)
      }
    }
    // Dependables
  }, [choiceOne, choiceTwo])



  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Starting a new game automatically
  useEffect(() => {
    ShuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>Formula Match</h1>
      <button onClick={ShuffleCards}>New Game</button>

      {/* grid to show the cards */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // 3 scenarios we want the card flipped over logical operation
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App