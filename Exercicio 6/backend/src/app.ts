import express from 'express';
import { createAnime, getAnimes, getAnime, updateAnimeController, deleteAnimeController } from './controllers/animeController';

const app = express();
app.use(express.json());

app.post('/api/animes', createAnime);
app.get('/api/animes', getAnimes);
app.get('/api/animes/:id', getAnime);
app.put('/api/animes/:id', updateAnimeController);
app.delete('/api/animes/:id', deleteAnimeController);

app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads/img'));

export default app;
