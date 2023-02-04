import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';
import './Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [text, setText] = useState("");
  let { deckId } = useParams();
  const [cards, setCards] = useState<string[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='card-text'>Card Text</label>
        <input id='card-text'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}

export default Deck