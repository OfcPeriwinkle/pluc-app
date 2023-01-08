import "./globals.css";
import Header from "./Header";

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
        <Header
          links={[
            { label: "pluc", link: "/" },
            { label: "coming soon", link: "/coming_soon" },
            { label: "about", link: "/about" },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
