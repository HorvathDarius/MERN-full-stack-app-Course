import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export async function getDecksController(req: Request, res: Response){
    // Fetch the decks from the db
    const decks = await DeckModel.find();
    // Return the documents in the repsonse
    res.json(decks);
}