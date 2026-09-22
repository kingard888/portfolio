import './globals.css';
import SoundEffect from './soundEffect';

export const metadata = {
  title: 'Veryard — Developer Portfolio',
  description: 'Portfolio pribadi Veryard / Verdyan Arda.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SoundEffect />
        {children}
      </body>
    </html>
  );
}
