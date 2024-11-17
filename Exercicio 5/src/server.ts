import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import app from './app';

app.listen(3003, () => console.log("Sevidor online\nPorta 3003"));

const filePath = path.join(__dirname, './data/animes.json');

app.get('/', async (req: Request, res: Response): Promise<void> => { 
    res.status(200).json({ msg: 'Conectado a API com sucesso.' });    
});

app.post('/animes', async (req: Request, res: Response): Promise<void> => { 
    const newAnime = { ...req.body}; 
    
    if(Object.keys(newAnime).length === 0) {
        res.status(422).json({msg: "Seu post está vazio."});
        return;
    }

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const animes = JSON.parse(data);
       
        newAnime.id = animes.length > 0 ? Math.max(...animes.map((anime: any) => anime.id)) + 1 : 1;
        
        animes.push(newAnime);
       
        await fs.writeFile(filePath, JSON.stringify(animes, null, 4));
       
        res.status(201).json({ animes: newAnime });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao gravar o anime.", error });
    }
});

app.get('/animes', async (req: Request, res: Response): Promise<void> => {
    try {

        const data = await fs.readFile(filePath, 'utf-8');
        const animes = JSON.parse(data);
        
        res.status(200).json({ Animes: animes });

    } catch (error) {
        res.status(500).json({ msg: "Erro ao ler os Animes.", error });
    }
});

app.get('/animes/:id', async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const animes = JSON.parse(data);

        const getAnimesId = animes.findIndex((anime: any) => anime.id === parseInt(id));

        if(getAnimesId === -1) {
            res.status(404).json({msg: "O anime buscado não foi encontrado."});
            return;
        }

        res.status(200).json({ Anime: animes[getAnimesId] });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar o Anime.", error });
    }
});

app.put('/animes/:id', async(req: Request, res: Response): Promise<void> => {
    const newAnime = { ...req.body}; 
    const { id } = req.params;
    
    if(Object.keys(newAnime).length === 0) {
        res.status(422).json({msg: "Sua atualização está vazia."});
        return;
    }

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const animes = JSON.parse(data);

        const getAnimesId = animes.findIndex((anime: any) => anime.id === parseInt(id));

        if(getAnimesId === -1) {
            res.status(404).json({msg: "O anime buscado não foi encontrado."});
            return;
        }
        
        animes[getAnimesId] = { ...animes[getAnimesId], ...newAnime};

        await fs.writeFile(filePath, JSON.stringify(animes, null, 4));

        res.status(200).json({ msg: "Anime atualizado.", Anime: animes[getAnimesId] });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar o Anime.", error });
    }
});

app.delete('/animes/:id', async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const animes = JSON.parse(data);

        const getAnimesId = animes.findIndex((anime: any) => anime.id === parseInt(id));

        if(getAnimesId === -1) {
            res.status(404).json({msg: "O Anime solicitado não foi encontrado."});
            return;
        }
        
        const delAnime = animes.splice(getAnimesId, 1);

        await fs.writeFile(filePath, JSON.stringify(animes, null, 4));

        res.status(200).json({ msg: "Anime deletado.", temas: delAnime });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar o Anime.", error });
    }
});