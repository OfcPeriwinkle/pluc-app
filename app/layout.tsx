import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gradient-to-b from-gray-dark to-gray text-white tracking-tighter">
        <nav className="flex justify-around items-center border-b-4 border-green mb-16 h-20 [&>a]:text-3xl [&>a]:font-bold [&>a]:text-gray-light">
          <a className="hover:text-white ease-in-out">pluc</a>
          <a className="hover:text-white ease-in-out">coming soon</a>
          <a className="hover:text-white ease-in-out">about</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
