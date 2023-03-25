import SearchOrLogin from './Components/auth/SearchOrLogin';

export default function Home() {
  return (
    <main className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <div className="flex min-h-screen flex-col items-center justify-start px-4 sm:px-6 md:px-8">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Keep the tunes, <span>pluc</span> the noise.
        </h1>
        <p className="mt-6 text-lg text-center max-w-3xl mx-auto text-gray-light font-medium">
          Lorem ipsum dolor sit amet, <span>consectetur adipiscing elit</span>, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris.
        </p>

        {/* SearchOrLogin is a client component and not part of SSR */}
        <SearchOrLogin />
      </div>
    </main>
  );
}
