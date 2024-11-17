import { Anime } from '../models/animeModel';
import { getAllAnimes, saveAnimes } from '../middlewares/animeRepository';

export const addAnime = async (newAnime: Anime): Promise<Anime> => {
    const animes = await getAllAnimes();
    newAnime.id = animes.length > 0 ? Math.max(...animes.map(a => a.id)) + 1 : 1;
    animes.push(newAnime);
    await saveAnimes(animes); 
    return newAnime;
};

export const getAnimeById = async (id: number): Promise<Anime | null> => {
    const animes = await getAllAnimes();
    return animes.find(anime => anime.id === id) || null;
};

export const updateAnime = async (id: number, updatedData: Partial<Anime>): Promise<Anime | null> => {
    const animes = await getAllAnimes();
    const index = animes.findIndex(anime => anime.id === id);
    if (index === -1) return null;
    animes[index] = { ...animes[index], ...updatedData };
    await saveAnimes(animes);
    return animes[index];
};

export const deleteAnime = async (id: number): Promise<Anime | null> => {
    const animes = await getAllAnimes();
    const index = animes.findIndex(anime => anime.id === id);
    if (index === -1) return null;
    const [deletedAnime] = animes.splice(index, 1);
    await saveAnimes(animes);
    return deletedAnime;
};
