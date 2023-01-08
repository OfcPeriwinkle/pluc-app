import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <input
        className="h-14 w-1/2 rounded-full text-2xl text-gray-dark align-center pl-5 pr-5 shadow-lg shadow-green"
        placeholder="Find a playlist"
      />
    </main>
  );
}
