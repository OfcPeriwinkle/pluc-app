import SearchOrLogin from './Components/SearchOrLogin';

export default function Home() {
  return (
    <main className="flex flex-col gap-10 justify-start items-center min-h-screen">
      <h1 className="text-7xl font-black text-center">
        Keep the tunes, <span>pluc</span> the noise
      </h1>
      <h2 className="text-3xl font-extrabold w-1/2 text-center">
        <span>Remove the duplicates</span> from your playlists that Spotify
        missed (or keep them, we won't tell)
      </h2>
      {/* SearchOrLogin contains state and is a client component */}
      <SearchOrLogin />
    </main>
  );
}
