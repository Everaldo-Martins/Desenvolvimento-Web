import Image from "next/image";
import Link from "next/link";

async function getAnimes() {
  const res = await fetch("http://localhost:3000/api/animes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Falha ao buscar os animes");
  }
  return res.json();
}

export default async function Home() {
  const { Animes } = await getAnimes();
  const getApi = 'http://localhost:3000/uploads'
  return (
    <>
      <header className="bg-zinc-900 p-5 shadow shadow-zinc-500">
        <h1 className="text-center text-2xl text-zinc-200">Meus Animes</h1>
      </header>
      <main>
      <div>
          <h2 className="w-full text-xl font-bold text-center p-4">Lista de Animes</h2>
          <div className="flex flex-row justify-center items-stretch flex-wrap gap-6">
            {Animes.map((anime: any) => (
              <div key={anime.id} className="bg-card flex flex-row justify-between gap-3 p-5 rounded-2xl shadow-md shadow-foreground transition-all hover:-translate-y-1">
                <Image
                  className="rounded-lg"
                  src={`${getApi}/${anime.img}`}
                  alt={anime.name}
                  width={200}
                  height={300}
                />
                <div className="flex flex-col justify-start items-stretch gap-4">
                  <h3 className="text-xl font-bold">Descrição</h3>
                  <p><strong>Nome: </strong>{anime.name}</p>
                  <p><strong>Iniciais: </strong>{anime.initials}</p>
                  <p><strong>Lançado: </strong>{anime.release}</p>
                  <p><strong>Autor(es): </strong>{anime.creator}</p>
                  <p><strong>Wikipédia: </strong><Link className="underline" href={anime.wikipedia} target="_blank">Ler mais.</Link></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-5">
        <span>Animes {new Date().getFullYear()} - Open code.</span>
      </footer>
    </>
  );
}