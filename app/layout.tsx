import './globals.css';
import Header from './Components/Header';
import ProvidersWrapper from './Components/ProvidersWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            { label: 'pluc', href: '/' },
            { label: 'sandbox', href: '/sandbox' },
            { label: 'coming soon', href: '/coming_soon' },
            { label: 'about', href: '/about' },
          ]}
        />

        {/*
          expose session context to children
          TODO: reduce scope once we get this working well
        */}
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
