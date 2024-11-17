import { Request, Response } from 'express';
import { addAnime, getAnimeById, updateAnime, deleteAnime } from '../services/animeServices';
import { getAllAnimes } from '../middlewares/animeRepository';

export const createAnime = async (req: Request, res: Response): Promise<void> => {
    const newAnime = { ...req.body };
    if (Object.keys(newAnime).length === 0) {
        res.status(422).json({ msg: "Seu post está vazio." });
        return;
    }
    try {
        const anime = await addAnime(newAnime);
        res.status(201).json({ animes: anime });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao gravar o anime.", error });
    }
};

export const getAnimes = async (req: Request, res: Response): Promise<void> => {
    try {
        const animes = await getAllAnimes();
        res.status(200).json({ Animes: animes });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao ler os Animes.", error });
    }
};

export const getAnime = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const anime = await getAnimeById(parseInt(id));
    if (!anime) {
        res.status(404).json({ msg: "O anime buscado não foi encontrado." });
        return;
    }
    res.status(200).json({ Anime: anime });
};

export const updateAnimeController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = { ...req.body };
    if (Object.keys(updatedData).length === 0) {
        res.status(422).json({ msg: "Sua atualização está vazia." });
        return;
    }
    const anime = await updateAnime(parseInt(id), updatedData);
    if (!anime) {
        res.status(404).json({ msg: "O anime buscado não foi encontrado." });
        return;
    }
    res.status(200).json({ msg: "Anime atualizado.", Anime: anime });
};

export const deleteAnimeController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const anime = await deleteAnime(parseInt(id));
    if (!anime) {
        res.status(404).json({ msg: "O Anime solicitado não foi encontrado." });
        return;
    }
    res.status(200).json({ msg: "Anime deletado.", Anime: anime });
};