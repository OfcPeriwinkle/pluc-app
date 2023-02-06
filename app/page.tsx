import SearchOrLogin from './Components/SearchOrLogin';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10">
      <h1 className="text-center text-7xl font-black">
        Keep the tunes, <span>pluc</span> the noise
      </h1>
      <h2 className="w-1/2 text-center text-3xl font-extrabold">
        <span>Remove the duplicates</span> from your playlists that Spotify missed (or keep them, we
        won't tell)
      </h2>
      <SearchOrLogin />
    </main>
  );
}
