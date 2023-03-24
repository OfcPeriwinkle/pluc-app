import ProvidersWrapper from './Components/auth/ProvidersWrapper';
import Header from './Components/nav/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gradient-to-b from-gray-dark to-gray text-white tracking-tighter">
        <ProvidersWrapper>
          <Header
            links={[
              { label: 'pluc', href: '/' },
              { label: 'coming soon', href: '/coming_soon' },
              { label: 'about', href: '/about' },
            ]}
          />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
