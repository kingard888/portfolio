import './globals.css';
import SoundEffect from './soundEffect';
import SplashOverlay from './splashOverlay';

export const metadata = {
  title: 'Veryard — Developer Portfolio',
  description: 'Portfolio pribadi Veryard / Verdyan Arda.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SoundEffect />
        <SplashOverlay />
        {children}
      </body>
    </html>
  );
}
