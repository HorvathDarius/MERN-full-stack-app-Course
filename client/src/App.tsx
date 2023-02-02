import React, { useEffect, useState } from 'react'
import './App.css';

type TDeck = {
  title: string,
  _id: string,
}

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    setTitle("");
  }

  useEffect(() => {
    //One downside of the useEffect is that you cannot make it async/await so we solve the problem by creating a function inside it
    // Because the second array, the dependency array is empty, the useEffect hook runs only twice.
    // First when the component is mounted, when the page loads
    async function fetchDecks(){
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
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
            {deck.title}
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
