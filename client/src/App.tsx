import React, { useEffect, useState } from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createDeck } from './api/createDeck';

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDelete(deckId: string){
    await deleteDeck(deckId);
    setDecks(decks.filter(deck => deck._id !== deckId));
  }

  useEffect(() => {
    // One downside of the useEffect is that you cannot make it async/await so we solve the problem by creating a function inside it
    // Because the second array, the dependency array is empty, the useEffect hook runs only twice.
    // First when the component is mounted, when the page loads
    async function fetchDecks(){
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();

    // And the second time when it is unounted, when we leave the page, then it runs a cleanup function
    return () => {
      console.log("cleanup");  
    }
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map(deck => (
          <li key={deck._id}>
            <button onClick={() => handleDelete(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>
              {deck.title}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input id='deck-title' 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
