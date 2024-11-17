import fs from 'fs/promises';
import path from 'path';
import { Anime } from '../models/animeModel';

const filePath = path.join(__dirname, '../data/animes.json');

export const getAllAnimes = async (): Promise<Anime[]> => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
};

export const saveAnimes = async (animes: Anime[]): Promise<void> => {
    await fs.writeFile(filePath, JSON.stringify(animes, null, 4));
};