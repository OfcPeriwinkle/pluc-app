import SearchOrLogin from './Components/auth/SearchOrLogin';

export default function Home() {
  return (
    <main className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <div className="flex min-h-screen flex-col items-center justify-start px-4 sm:px-6 md:px-8">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Keep the tunes, <span>pluc</span> the noise.
        </h1>
        <p className="mt-6 text-lg text-center max-w-3xl mx-auto text-gray-light font-medium">
          If you love music, your playlists are a huge part of your day to day. So why let them fill
          up with clutter? <span>pluc keeps your playlists squeaky clean</span> by detecting
          multiple versions of the same track that Spotify missed, letting you share your favorite
          songs without the static.
        </p>

        {/* SearchOrLogin is a client component and not part of SSR */}
        <SearchOrLogin />
      </div>
    </main>
  );
}
